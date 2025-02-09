# Xpensify

🚀 AI-Powered Expense Tracking & Fraud-Free Financials

Xpensify is an advanced expense management system that leverages AI to automate financial tracking, detect fraud, and streamline expense approvals. Designed for organizations of all sizes, Xpensify provides a secure, efficient, and intelligent solution for managing corporate expenses.

Demo:
https://drive.google.com/drive/folders/1WSY_2pHomHpYVEaA-XaNkgA7mPeAi0wv?usp=sharing

## 🎯 Key Features

* **AI-Powered Expense Tracking:** Automate expense categorization, fraud detection, and anomaly analysis.
* **Multi-Role Access Control:** Role-based dashboard for Managers, Financial Teams, and Employees.
* **Fraud Detection & Prevention:** AI-driven insights to detect unusual spending patterns.
* **Real-Time Expense Reporting:** Generate dynamic reports with live data.
* **Approval Workflows:** Managers can review and approve expenses seamlessly.
* **Secure & Compliant:** Ensures data security and regulatory compliance.

## 🏢 User Roles & Functionalities

### 1️⃣ Manager

* View and approve/reject employee expense claims.
* Track departmental expenses.
* Generate financial reports for better budget planning.

### 2️⃣ Financial Team

* Audit expenses for fraud detection.
* Manage vendor payments and reimbursement processing.
* Generate compliance reports and handle tax filings.

### 3️⃣ Employee

* Submit expenses with receipts.
* Track expense approval status.
* View past expenses and reimbursement details.

## 📊 System Flow Diagrams

### 1️⃣ **Expense Tracking Flow**
![Expense Tracking](https://github.com/user-attachments/assets/1b943007-f80b-4217-889b-7ba403932e11)

### 2️⃣ **Fraud Detection & AI Insights**
![Fraud Detection](https://github.com/user-attachments/assets/447ef723-e866-4750-9020-e506967416cc)



## 🛠️ Tech Stack

* **Frontend:** React.js, TailwindCSS,Redux
* **Backend:** FastAPI, Python
* **Database:** PostgreSQL, Firebase Storage
* **AI & Machine Learning:** TensorFlow, OpenAI API (for fraud detection)
* **Authentication:** JWT Authentication
* **Deployment:** Docker, AWS

## 🔧 Installation & Setup  

### 🛠️ **Prerequisites**  
Ensure you have the following installed:  
- **Node.js (v18+) & npm**  
- **Python 3.9+**  
- **PostgreSQL Database**  
- **Git**  

### 📥 **1. Clone the Repository**  
```bash
git clone https://github.com/your-username/Xpensify.git
cd Xpensify
```

### 🔨 **2. Backend Setup**  

#### 📌 **A. Install Node.js Backend (Express)**
```bash
cd backend
npm install
```

#### 📌 **B. Setup Flask Backend (AI Services)**  
```bash
cd flask-backend
pip install -r requirements.txt
```

#### 📌 **C. Setup Environment Variables**  
Create a `.env` file inside `backend/` and `flask-backend/` directories:  
```ini
# Backend (Express)
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/xpensify
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
```

```ini
# Flask AI Service
FLASK_PORT=7000
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
```

#### 📌 **D. Run the Backend Services**
```bash
# Start Express Server
cd backend
npm start

# Start Flask AI Service
cd flask-backend
python app.py
```

---

### 🎨 **3. Frontend Setup (React + Tailwind + Redux)**  
```bash
cd frontend
npm install
```

#### 📌 **A. Setup Environment Variables**  
Create a `.env` file inside `frontend/`:  
```ini
REACT_APP_API_URL=http://localhost:5000
REACT_APP_FLASK_API=http://localhost:7000
REACT_APP_OPENAI_KEY=your_openai_api_key
```

#### 📌 **B. Run the Frontend**  
```bash
npm start
