# planIT - AI Powered Study Planner

> BUS4012 Vibe Coding for Startups — Assessment 3  
> Student: Minh Phuong Dang | ID: 22941223

planIT helps university students turn overwhelming assignment deadlines into structured, AI-generated study plans.

---

## Project Structure

```
planIT/
├── frontend/        ← React + TypeScript + Tailwind CSS
└── backend/         ← Python FastAPI + Supabase
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Backend | Python, FastAPI, Uvicorn |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel (frontend + backend) |
| State | Zustand + localStorage |

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/planIT.git
cd planIT
```

### 2. Set up the backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # Fill in your Supabase credentials
uvicorn main:app --reload
```

### 3. Set up the frontend
```bash
cd frontend
npm install
cp .env.example .env.local      # Fill in VITE_API_URL
npm run dev
```

### 4. Set up Supabase
- Create a project at https://supabase.com
- Go to SQL Editor and run `backend/supabase_setup.sql`
- Copy your Project URL and anon key into `backend/.env`

---

## Environment Variables

### Backend (`backend/.env`)
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env.local`)
```
VITE_API_URL=http://localhost:8000
```

⚠️ Never commit `.env` or `.env.local` to GitHub.

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/` | Health check |
| POST | `/auth/signup` | Create account |
| POST | `/auth/login` | Sign in |
| GET | `/tasks/{user_id}` | Get all tasks |
| POST | `/tasks` | Create task |
| PATCH | `/tasks/{task_id}` | Update task |
| DELETE | `/tasks/{task_id}` | Delete task |
