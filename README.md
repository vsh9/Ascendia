# Ascendia - AI-Powered Alumni-Student Networking Platform

## 🚀 Overview

Ascendia is an AI-powered networking platform that connects students and alumni for mentorship, career guidance, and collaboration. It integrates **Django REST Framework** for the backend, **React** for the frontend, **Solidity** for blockchain-powered verification, and **AI models** for smart mentor-matching.

---

## 🏗️ Tech Stack

| Component      | Technology Used                         |
| -------------- | --------------------------------------- |
| **Frontend**   | React, TailwindCSS                      |
| **Backend**    | Django REST Framework (DRF), PostgreSQL |
| **AI**         | Python (scikit-learn, TensorFlow, NLP)  |
| **Blockchain** | Solidity, Hardhat, Web3.js              |

---

## 📂 Project Structure

```
/ascendia/                     # Root project directory
│── /backend/                   # Django REST API backend
│── /frontend/                  # React frontend
│── /ai/                        # AI & Machine Learning models
│── /blockchain/                # Solidity Smart Contracts
│── /docs/                      # Documentation (API, setup, etc.)
│── /deploy/                    # Deployment setup (Docker, Nginx, Kubernetes)
│── README.md                   # Project Documentation
│── .gitignore                   # Ignore unnecessary files
```

---

## 🔧 Installation & Setup

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/vsh9/Ascendia
cd ascendia
```

### **2️⃣ Backend Setup (Django REST Framework)**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # (Windows: venv\Scripts\activate)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### **3️⃣ Frontend Setup (React)**

```bash
cd frontend
npm install
npm run dev
```

### **4️⃣ AI Service Setup**

```bash
cd ai
pip install -r requirements.txt
python main.py
```

### **5️⃣ Blockchain Setup (Solidity)**

```bash
cd blockchain
npm install
npx hardhat compile
npx hardhat test
```

---

## 📌 Features

### **🎨 Frontend (React)**

- User Authentication & Profile Management
- Interactive Dashboard for Alumni & Students
- Real-time Chat & Mentorship Scheduling

### **🖥️ Backend (Django REST Framework)**

- User Authentication (JWT-based)
- Mentorship Matching & Scheduling API
- Forum & Event Management
- Secure Web3 Blockchain Integration

### **🤖 AI (Python, ML/NLP)**

- Smart Mentor Matching (AI-based recommendations)
- Natural Language Processing (Chatbot for Career Guidance)

### **🔗 Blockchain (Solidity, Web3.js)**

- Verifiable Certificate & Alumni Data Storage

---

## 📜 Documentation

For API documentation, refer to the `docs/` folder:

- API Guide: `/docs/API_DOCS.md`
- Setup Guide: `/docs/SETUP_GUIDE.md`
- Architecture: `/docs/ARCHITECTURE.md`
- Roadmap & Milestones: `/docs/ROADMAP.md`

---

### 🚀 Let's build a powerful alumni-student network together! 🎓🤝
