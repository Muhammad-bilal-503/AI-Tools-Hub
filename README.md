#  AI Platform — 35 Tools

35 AI-powered tools ek hi platform mein | Built by Syed Shah | Web Engineering 2025-2026

---

##  Setup Instructions (Step by Step)

### Step 1 — Project Download Karo
ZIP file download karo aur unzip karo kisi bhi folder mein.

---

### Step 2 — Gemini API Key Lo (FREE)
1. https://aistudio.google.com pe jao
2. Google account se login karo
3. "Get API Key" click karo
4. "Create API Key" click karo
5. Key copy karo — yeh aapki FREE Gemini API key hai

---

### Step 3 — MongoDB Atlas Setup (FREE)
1. https://mongodb.com/atlas pe jao
2. Free account banao
3. "Create a deployment" → "M0 Free" select karo
4. Username aur password set karo (yaad rakhna!)
5. "Connect" → "Drivers" → Connection string copy karo
6. String mein `<password>` ki jagah apna password daalo

---

### Step 4 — Backend Setup

Terminal mein yeh commands chalao:

```bash
cd ai-platform/backend
npm install
```

Ab `.env` file banao `.env.example` ko copy karke:

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

`.env` file kholo aur apni values daalo:
```
GEMINI_API_KEY=yahan_apni_gemini_key_daalo
JWT_SECRET=koi_bhi_random_string_jaise_mySecret123
MONGODB_URI=yahan_apna_mongodb_connection_string_daalo
```

Backend chalao:
```bash
npm run dev
```

Yeh message aana chahiye:
```
✅ Server port 5000 pe chal raha hai
✅ MongoDB connected
```

---

### Step 5 — Frontend Setup

Naya terminal kholo aur:

```bash
cd ai-platform/frontend
npm install
npm start
```

Browser mein http://localhost:3000 khulega ✅

---

##  Project Structure

```
ai-platform/
├── backend/
│   ├── server.js          # Main server
│   ├── routes/
│   │   ├── auth.js        # Login/Register
│   │   └── ai.js          # Sab 35 AI tools ke endpoints
│   ├── middleware/
│   │   └── auth.js        # JWT token checker
│   ├── models/
│   │   └── User.js        # User database model
│   └── .env               # Apni API keys (secret!)
│
├── frontend/
│   └── src/
│       ├── App.js          # Main router (35 routes)
│       ├── pages/
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── Dashboard.js  # 35 tools ki grid
│       │   └── tools/        # 35 tool pages
│       ├── components/
│       │   ├── Navbar.js
│       │   └── ToolPage.js   # Shared wrapper
│       ├── context/
│       │   └── AuthContext.js # Login state
│       └── services/
│           └── api.js        # Axios API calls
│
└── generateTools.js  # Tool pages generator (already run)
```

---

## 🛠️ Tech Stack (All Free!)

| Technology | Use | Cost |
|---|---|---|
| React.js | Frontend | Free |
| Node.js + Express | Backend | Free |
| MongoDB Atlas | Database | Free (512MB) |
| Google Gemini API | AI Engine | Free (1500 req/day) |
| JWT | Authentication | Free |

---

## ❗ Common Errors & Fixes

**"Cannot connect to MongoDB"**
→ .env mein MONGODB_URI check karo, password sahi daala?

**"Gemini API error"**
→ GEMINI_API_KEY check karo — space toh nahi?

**"Module not found"**
→ `npm install` dobara chalao

**Frontend khaali page show kar raha hai**
→ Backend chal raha hai? Port 5000 pe?

---

## 📞 Support
Instructor: Syed Shah | Web Engineering Course 2025-2026
