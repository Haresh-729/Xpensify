import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import google.generativeai as genai
from dotenv import load_dotenv

# Initialize Flask App
app = Flask(__name__)
CORS(app, support_credentials=True)

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GENAI_API_KEY"))

# Sample company data (Policies, Rejection Reasons, Guidelines)
company_data = {
    "policies": {
        "Travel Reimbursement": "Employees can claim travel expenses up to $500 per trip. Receipts must be provided.",
        "Work from Home": "Employees are allowed to work remotely for up to 3 days a week with manager approval."
    },
    "rejection_reasons": {
        "Expense Claim Denied": "Your claim was denied because it exceeded the allowed budget.",
        "Leave Request Rejected": "Leave request rejected due to workload constraints."
    },
    "submission_guidelines": {
        "Expense Submission": "Submit all receipts and justifications within 30 days of the transaction.",
        "Leave Application": "Leaves should be applied at least 7 days in advance unless it's an emergency."
    }
}

@app.route("/chat", methods=["POST"])
@cross_origin(supports_credentials=True)
def chatbot():
    data = request.json
    user_message = data.get("message", "")

    # Create prompt with all company data
    context = "\n".join(
        list(company_data["policies"].values()) +
        list(company_data["rejection_reasons"].values()) +
        list(company_data["submission_guidelines"].values())
    )

    prompt = f"""
    You are an AI assistant trained to help employees understand company policies, rejection reasons, and submission guidelines.
    Use the following information to provide responses:
    {context}
    
    Employee Query: {user_message}
    AI Response:
    """

    # Generate response from Gemini AI
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(prompt)

    return jsonify({"response": response.text})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
