import os
from flask import Flask, request, jsonify
import re
import numpy as np
import pandas as pd
import joblib
from flask import Flask, request, jsonify
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import re
import pdfplumber
import pandas as pd
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)



def extract_state_codes(pdf_path):
    state_codes = {}
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                lines = text.split("\n")
                for line in lines:
                    match = re.match(r"(\d{2})\s+([A-Za-z\s]+)", line)
                    if match:
                        state_code = match.group(1)
                        state_name = match.group(2).strip()
                        state_codes[state_code] = state_name
    return state_codes

# Load GST State Codes
pdf_path = "GSTno_reg_wise_250717.pdf"
STATE_CODES = extract_state_codes(pdf_path)

def is_valid_gst(gst_no):
    GST_STATE_CODES = {
        "24": "Gujarat",
        "29": "Karnataka",
        "23": "Madhya Pradesh",
        "21": "Odisha",
        "04": "Chandigarh (UT)",
        "03": "Punjab",
        "33": "Tamil Nadu",
        "34": "Puducherry",
        "35": "Andaman & Nicobar (UT)",
        "07": "Delhi (UT)",
        "18": "Assam",
        "13": "Nagaland",
        "16": "Tripura",
        "37": "Andhra Pradesh",
        "36": "Telangana",
        "08": "Rajasthan",
        "32": "Kerala",
        "09": "Uttar Pradesh",
        "05": "Uttarakhand",
        "27": "Maharashtra",
        "30": "Goa",
        "06": "Haryana",
        "02": "Himachal Pradesh",
        "10": "Bihar",
        "20": "Jharkhand",
        "19": "West Bengal",
        "22": "Chhattisgarh"
    }
    """Validate GSTIN using regex and state codes."""
    gst_pattern = r"^(\d{2})([A-Z]{5}\d{4}[A-Z]{1})(\d{1}[A-Z]{1}[A-Z\d]{1})$"
    
    match = re.match(gst_pattern, gst_no)
    if not match:
        return False, "Invalid GST format."

    state_code, pan_part, _ = match.groups()

    # Validate State Code
    if state_code not in GST_STATE_CODES:
        return False, f"Invalid state code {state_code} in GST."

    # Validate PAN format in GST
    pan_pattern = r"^[A-Z]{5}\d{4}[A-Z]{1}$"
    if not re.match(pan_pattern, pan_part):
        return False, "Invalid PAN structure in GST."

    return True, "GST is valid."


# -----------------------------
# Duplicate Bill Detection Function
# -----------------------------
def check_duplicate_bill(event, category, amount, date, gst_no, reason):
    duplicate = bills[
        (bills["event"] == event) &
        (bills["category"] == category) &
        (bills["amount"] == amount) &
        (bills["date"] == date) &
        (bills["gst_no"] == gst_no) &
        (bills["reason"] == reason)
    ]
    if not duplicate.empty:
        return True, "Duplicate bill detected."
    return False, ""

# -----------------------------
# Anomaly Detection for Suspicious Spending Patterns (Local: event+category)
# -----------------------------
def check_anomaly_local(event, category, amount):
    """
    Perform anomaly detection using K-Means on the subset of bills for the same event and category.
    Returns a tuple (is_anomaly, message). If there are insufficient records (< 5), anomaly detection is skipped.
    """
    subset = bills[(bills["event"] == event) & (bills["category"] == category)]
    # if len(subset) < 5:
    #     print("Skipping anomaly detection for event/category due to insufficient data.")
    #     return False, ""

    if subset.empty:
        print(f"⚠️ No historical data for event: {event}, category: {category}. Skipping anomaly detection.")
        return False, "No historical data available for anomaly detection."
    
    # Scale the amounts in this subset.
    scaler_local = StandardScaler()
    subset_scaled = scaler_local.fit_transform(subset[["amount"]])
    
    # Train a K-Means model on the local subset; using k=2 clusters.
    kmeans_local = KMeans(n_clusters=2, random_state=42)
    kmeans_local.fit(subset_scaled)
    
    # Calculate distances from each record in the subset to its nearest cluster center.
    distances_subset = kmeans_local.transform(subset_scaled)
    min_distances = distances_subset.min(axis=1)
    threshold = min_distances.mean() + 2 * min_distances.std()
    
    # Scale the new amount using the same scaler.
    new_amount_scaled = scaler_local.transform(np.array([[amount]]))
    distances_new = kmeans_local.transform(new_amount_scaled)
    min_distance_new = distances_new.min()
    
    if min_distance_new > threshold:
        return True, "Spending anomaly detected (amount deviation exceeds threshold)."
    
    return False, "✅ Within normal spending pattern."

def check_personal_use(amount, reason):
    """
    If the amount is very high and the reason suggests personal use,
    flag the bill as fraudulent.
    """
    # Define a threshold for a 'big' amount.
    big_amount_threshold = 100000.0  # Adjust as needed.
    # Define keywords that suggest personal use.
    personal_keywords = [
        "for fun", "personal", "luxury", "not business", "private", "for my own",
        "self", "leisure", "vacation", "holiday", "non-official", "non-business",
        "unofficial", "indulgence", "treat", "extravagance", "spare", "extra", "discretionary"
    ]
    
    if amount > big_amount_threshold or amount > 500000:
        reason_lower = reason.lower()
        if any(keyword in reason_lower for keyword in personal_keywords):
            return True, "High amount with personal use indication."
    return False, ""

def check_historical_fraud(event, category, amount):
    """
    Identifies suspicious expenses based on historical fraud data.
    Excludes records that have GST-related fraud remarks.
    """
    # 1️⃣ **Filter Historical Fraud Records (Excluding GST Errors)**
    historical_fraud = bills[
        (bills["event"] == event) &
        (bills["category"] == category) &
        (bills["fraud"] == "Yes") &
        (~bills["fraud_remark"].apply(lambda x: "Invalid state code" in str(x) or "Invalid GST" in str(x)))
    ]

    if historical_fraud.empty:
        return False, ""

    print("\n🔍 Historical Fraud Records (Excluding GST Issues):")
    print(historical_fraud)

    # 2️⃣ **Calculate Interquartile Range (IQR) & Fraud Threshold**
    Q1 = historical_fraud["amount"].quantile(0.25)
    Q3 = historical_fraud["amount"].quantile(0.75)
    IQR = Q3 - Q1
    fraud_threshold = Q3 + 1.5 * IQR  # 🚩 Suspicious if above this

    print(f"\n📊 **Fraud Threshold Calculation:**")
    print(f"Q1 (25th percentile) = ₹{Q1:.2f}")
    print(f"Q3 (75th percentile) = ₹{Q3:.2f}")
    print(f"IQR = ₹{IQR:.2f}")
    print(f"🚨 Fraud Threshold = ₹{fraud_threshold:.2f}")

    # 3️⃣ **Check if Amount is Suspicious**
    if amount > fraud_threshold:
        return True, f"🚨 Matches historical fraud pattern (above ₹{fraud_threshold:.2f})."

    return False, ""


@app.route('/detect', methods=['POST'])
@cross_origin(supports_credentials=True)
def detect_fraud_api():
    global bills
    dummy_file = "dummy_fraud_data.csv"
    RETRAIN_THRESHOLD = 1

    # Create dummy data if file doesn't exist.
    if not os.path.exists(dummy_file):
        dummy_data = {
            "date": [
            "2025-01-10",
            "2025-01-11",
            "2025-01-12",
            "2025-01-13",
            "2025-01-14"
        ],
        "event": [
            "Business Trip US",
            "Business Trip US",
            "Tech Conference",
            "Client Meeting",
            "Business Trip US"
        ],
        "category": [
            "Travel",
            "Food",
            "Travel",
            "Food",
            "Accommodation"
        ],
        "amount": [
            45000.00,
            3000.00,
            38000.00,
            2500.00,
            9500.00
        ],
        "reason": [
            "Flight ticket",
            "Lunch with clients",
            "Cab fare",
            "Dinner with client",
            "Hotel stay"
        ],
        "gst_no": [
            "07XYZAB2345K2L6",
            "27ABCDE1234F1Z5",
            "27ABCDE1234F1Z5",
            "07XYZAB2345K2L6",
            "07XYZAB2345K2L6"
        ],
        "fraud_remark": [
            [],[],[],[],[]
        ]
    }
        df_dummy = pd.DataFrame(dummy_data)
        df_dummy["fraud"] = "No"  # Initially mark all as non-fraudulent.
        # Add a placeholder for scaled amounts.
        df_dummy["amount_scaled"] = 0.0
        df_dummy.to_csv(dummy_file, index=False)
    else:
        df_dummy = pd.read_csv(dummy_file)

    # Use the dummy file as our dataset for fraud detection.
    bills = df_dummy.copy()
    print("Loaded dummy data:")
    print(bills)
    
    data = request.json
    event = data.get("event", "").strip()
    category = data.get("category", "").strip()
    try:
        amount = float(data.get("amount", 0))
    except ValueError:
        return jsonify({"error": "Amount must be a number."}), 400
    date = data.get("date", "").strip()  # Format: "YYYY-MM-DD"
    gst_no = data.get("gst_no", "").strip()
    reason = data.get("reason", "").strip()
    
    fraud_detected = False
    fraud_reasons = []
    
    # 1. Duplicate Check: Check for exact match.
    is_duplicate, dup_msg = check_duplicate_bill(event, category, amount, date, gst_no, reason)
    if is_duplicate:
        fraud_detected = True
        fraud_reasons.append(dup_msg)
    
    # 2. GST Validation.
    is_valid, gst_msg = is_valid_gst(gst_no)
    if not is_valid:
        fraud_detected = True
        fraud_reasons.append(gst_msg)
    
    # 3. Anomaly Detection (local to event & category).
    is_anomaly, anomaly_msg = check_anomaly_local(event, category, amount)
    if is_anomaly:
        fraud_detected = True
        fraud_reasons.append(anomaly_msg)
    
    # 4. Check for personal use in large amounts.
    is_personal, personal_msg = check_personal_use(amount, reason)
    if is_personal:
        fraud_detected = True
        fraud_reasons.append(personal_msg)

    is_hist_fraud, hist_msg = check_historical_fraud(event, category, amount)
    if is_hist_fraud:
        fraud_detected = True
        fraud_reasons.append(hist_msg)
    
    # Append new record if not duplicate (if duplicate, it's already flagged).
    if not is_duplicate:
        new_record = pd.DataFrame({
            "event": [event],
            "category": [category],
            "amount": [amount],
            "date": [date],
            "gst_no": [gst_no],
            "reason": [reason],
            "fraud": ["Yes" if fraud_detected else "No"],
            "fraud_remark": [fraud_reasons],
            "amount_scaled": [0]  # Placeholder; will be updated during retraining.
        })
        bills = pd.concat([bills, new_record], ignore_index=True)
        bills.to_csv(dummy_file, index=False)
    
    # Retrain anomaly model every RETRAIN_THRESHOLD new records if enough data exists.
    if len(bills) % RETRAIN_THRESHOLD == 0 and len(bills) >= 5:
        retrain_anomaly_model()
    
    return jsonify({
        "event": event,
        "category": category,
        "amount": amount,
        "date": date,
        "gst_no": gst_no,
        "reason": reason,
        "fraud_detected": fraud_detected,
        "fraud_reasons": fraud_reasons,
        "status": "❌ FRAUD" if fraud_detected else "✅ Legit"
    })

# -----------------------------
# Global Model Retraining Function
# -----------------------------
def retrain_anomaly_model():
    global bills
    print("Retraining global anomaly model with", len(bills), "records...")
    scaler_global = StandardScaler()
    bills["amount_scaled"] = scaler_global.fit_transform(bills[["amount"]])
    kmeans_global = KMeans(n_clusters=2, random_state=42)
    kmeans_global.fit(bills[["amount_scaled"]])
    distances_global = kmeans_global.transform(bills[["amount_scaled"]])
    min_distances = distances_global.min(axis=1)
    threshold_global = min_distances.mean() + 2 * min_distances.std()
    joblib.dump(kmeans_global, "kmeans_model.pkl")
    joblib.dump(threshold_global, "kmeans_threshold.pkl")
    joblib.dump(scaler_global, "scaler.pkl")
    print("✅ Global anomaly model retrained!")


@app.route('/policy', methods=['POST'])
@cross_origin(supports_credentials=True)
def policy_compliance():
    data = request.json
    print("Received Data:", data)

    message = data.get("message", {})
    policies = message.get("policies", {})  # Extract policies
    bill_items = message.get("billItems", [])  # Extract bill items

    compliance_results = {}

    for bill in bill_items:
        event = bill.get("event", "").strip()
        category = bill.get("category", "").strip()
        try:
            amount = float(bill.get("amount", 0))
        except ValueError:
            return jsonify({"error": f"Amount must be a number for category {category}."}), 400
        reason = bill.get("remarks", "")

        # **Find the policy that matches the event dynamically**
        event_policy = None
        for policy_key, policy_data in policies.items():
            if category in policy_data["allowed_categories"]:
                event_policy = policy_data
                break  # Stop once we find a matching policy

        if event_policy is None:
            compliance_results[event] = {
                "status": "❌ No policy found for this event",
                "category": category,
                "amount": amount,
                "reason": reason
            }
            continue

        # Extract limits & allowed categories
        allowed_categories = set(event_policy.get("allowed_categories", []))
        category_limits = {cat: int(limit) for cat, limit in zip(allowed_categories, event_policy.get("category_limits", []))}

        # ✅ Check if category is allowed
        category_status = "✅ Allowed" if category in allowed_categories else "❌ Not Allowed"

        # ✅ Sum previous amounts for same category (to check limit compliance)
        total_category_amount = sum(
            bill["amount"] for bill in bill_items if bill["category"] == category
        ) + amount

        # ✅ Check if amount exceeds category limit
        if category in category_limits:
            amount_status = (
                "✅ Within Limit"
                if total_category_amount <= category_limits[category]
                else f"❌ Exceeds Limit (Total: ₹{total_category_amount}, Limit: ₹{category_limits[category]})"
            )
        else:
            amount_status = "❌ No Spending Limit Defined"

        # ✅ Check for required justification
        justification_status = "✅ Provided" if reason else "❌ Missing"

        # Store compliance results
        if event not in compliance_results:
            compliance_results[event] = []

        compliance_results[event].append({
            "category": category,
            "amount": amount,
            "reason": reason,
            "category_status": category_status,
            "amount_status": amount_status,
            "justification_status": justification_status
        })

    return jsonify(compliance_results)




if __name__ == "__main__":
    app.run(debug=True)
