from flask import Flask, request, jsonify
from PIL import Image
import pytesseract
import re
import cv2
import os
import numpy as np
from google import genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

CATEGORY_LIST = ['decoration', 'food', 'beverage', 'clothing', 'travel', 'accommodation']
api_key = "AIzaSyDAvKGmRKcz-2yicwnYr9wt-JTGiitq_58"

# Helper functions
def to_snake_case(s):
    return re.sub(r'\s+', '_', s.strip().lower())

def parse_description(description, ext_quantity):
    tokens = description.strip().split()
    valid_categories = [cat.lower() for cat in CATEGORY_LIST]
    if ext_quantity:
        if tokens:
            candidate = tokens[-1].strip().lower()
            if candidate in valid_categories or candidate == "n/a":
                item_name = " ".join(tokens[:-1])
                category = "N/A" if candidate == "n/a" else tokens[-1]
            else:
                item_name = description.strip()
                category = "N/A"
        else:
            item_name = description.strip()
            category = "N/A"
        quantity = ext_quantity
    else:
        if tokens and tokens[-1].isdigit():
            quantity = tokens[-1]
            if len(tokens) >= 2:
                candidate = tokens[-2].strip().lower()
                if candidate in valid_categories or candidate == "n/a":
                    item_name = " ".join(tokens[:-2])
                    category = "N/A" if candidate == "n/a" else tokens[-2]
                else:
                    item_name = " ".join(tokens[:-1])
                    category = "N/A"
            else:
                item_name = description.strip()
                category = "N/A"
        else:
            item_name = description.strip()
            category = "N/A"
            quantity = "N/A"
    return item_name, category, quantity

def call_gemini_api(item_name):
    prompt = f"Given the categories {CATEGORY_LIST}, in which category does the item '{item_name}' best fit? Only give one word reply."
    client = genai.Client(api_key=api_key)

    MODEL = 'gemini-2.0-flash'
    chat = client.chats.create(model=MODEL)

    response = chat.send_message(prompt)

    return response.candidates[0].content.parts[0].text

# Route to process image and extract bill details
@app.route('/process-image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image_file = request.files['image']
    image = Image.open(image_file)

    # Convert image to grayscale
    image = np.array(image.convert('L'))

    # Extract text using pytesseract
    text = pytesseract.image_to_string(image).lower()

    # Extract vendor name
    lines = [line.strip() for line in text.strip().splitlines() if line.strip()]
    vendor_name = lines[0] if lines else "N/A"
    if vendor_name.lower().endswith("company"):
        vendor_name = vendor_name[:-len("company")].strip()

    # Extract date
    date_pattern = r'\b(?:\d{1,2}/\d{1,2}/\d{4})\b'
    date_match = re.search(date_pattern, text)
    date = date_match.group() if date_match else "Date not found"

    # Extract items
    item_pattern = r'\d+\s*\|\s*(.*?)\s*(?:\|\s*(\d+))?\s*\$(\d+)'
    matches = re.findall(item_pattern, text)

    structured_items = []
    for item_desc, ext_quantity, price in matches:
        item_name, category, quantity = parse_description(item_desc, ext_quantity.strip() if ext_quantity else "")
        item_name_snake = to_snake_case(item_name)
        if category == 'N/A':
            predicted_category = call_gemini_api(item_name)
            structured_items.append({
                "item_name": item_name_snake,
                "category": category,
                "predicted_cat": predicted_category,
                "quantity": quantity,
                "price": price
            })
        else:
            structured_items.append({
                "item_name": item_name_snake,
                "category": category,
                "quantity": quantity,
                "price": price
            })

    # Extract final amount
    final_amount_pattern = r'total\s*\$(\d+)'
    final_amount_match = re.search(final_amount_pattern, text, re.IGNORECASE)
    final_amount = final_amount_match.group(1) if final_amount_match else "N/A"

    result = {
        "vendor_name": vendor_name,
        "date": date,
        "final_amount": final_amount,
        "structured_items": structured_items
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
