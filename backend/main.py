import httpx
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="planIT API", version="1.0.0")

# CORS - allows React frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase client
def get_supabase() -> Client:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    if not url or not key:
        raise HTTPException(status_code=500, detail="Supabase credentials not configured")
    return create_client(url, key)

# Supabase admin client (uses service_role key for admin operations)
def get_supabase_admin() -> Client | None:
    url = os.getenv("SUPABASE_URL")
    service_key = os.getenv("SUPABASE_SERVICE_KEY")
    if url and service_key:
        return create_client(url, service_key)
    return None

# Supabase service role headers for direct REST API calls (bypasses RLS)
def get_service_headers() -> dict | None:
    service_key = os.getenv("SUPABASE_SERVICE_KEY")
    if service_key:
        return {
            "apikey": service_key,
            "Authorization": f"Bearer {service_key}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        }
    return None


# ─── Models ────────────────────────────────────────────────────────────────

class UserSignUp(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class TaskCreate(BaseModel):
    user_id: str
    subject: str
    deadline: str
    priority: str          # 'low' | 'medium' | 'high'
    duration: int
    notes: Optional[str] = ""
    ai_enabled: Optional[bool] = True
    done: Optional[bool] = False

class TaskUpdate(BaseModel):
    done: Optional[bool] = None
    subject: Optional[str] = None
    deadline: Optional[str] = None
    priority: Optional[str] = None
    duration: Optional[int] = None
    notes: Optional[str] = None


# ─── Health Check ──────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"message": "planIT API is running ✅"}


# ─── Auth Routes ───────────────────────────────────────────────────────────

@app.post("/auth/signup")
def signup(data: UserSignUp, supabase: Client = Depends(get_supabase)):
    try:
        admin = get_supabase_admin()

        # Create auth user via admin API (bypasses rate limits & email confirmation)
        if admin:
            admin_response = admin.auth.admin.create_user({
                "email": data.email,
                "password": data.password,
                "email_confirm": True,
            })
            user_id = admin_response.user.id
        else:
            # Fallback to regular sign_up
            auth_response = supabase.auth.sign_up({
                "email": data.email,
                "password": data.password,
            })
            if not auth_response.user:
                raise HTTPException(status_code=400, detail="Signup failed")
            user_id = auth_response.user.id

        # Save name + email to users table via direct REST (service_role bypasses RLS)
        supa_url = os.getenv("SUPABASE_URL", "")
        service_key = os.getenv("SUPABASE_SERVICE_KEY")
        if service_key:
            hdrs = {
                "apikey": service_key,
                "Authorization": f"Bearer {service_key}",
                "Content-Type": "application/json",
            }
            resp = httpx.post(
                f"{supa_url}/rest/v1/users",
                json={"id": user_id, "name": data.name, "email": data.email},
                headers=hdrs,
            )
            if resp.status_code >= 400:
                raise Exception(resp.text)
        else:
            supabase.table("users").insert({
                "id": user_id,
                "name": data.name,
                "email": data.email,
            }).execute()

        return {
            "message": "Account created successfully",
            "user_id": user_id,
            "name": data.name,
            "email": data.email,
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/auth/login")
def login(data: UserLogin, supabase: Client = Depends(get_supabase)):
    try:
        auth_response = supabase.auth.sign_in_with_password({
            "email": data.email,
            "password": data.password,
        })

        if not auth_response.user:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        user_id = auth_response.user.id

        # Get name from users table
        user_row = supabase.table("users").select("name").eq("id", user_id).single().execute()
        name = user_row.data["name"] if user_row.data else "User"

        return {
            "message": "Login successful",
            "user_id": user_id,
            "name": name,
            "email": data.email,
            "access_token": auth_response.session.access_token,
        }

    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid email or password")


# ─── Task Routes ───────────────────────────────────────────────────────────

@app.get("/tasks/{user_id}")
def get_tasks(user_id: str, supabase: Client = Depends(get_supabase)):
    """Get all tasks for a user"""
    try:
        service_key = os.getenv("SUPABASE_SERVICE_KEY")
        if service_key:
            supa_url = os.getenv("SUPABASE_URL", "")
            hdrs = {
                "apikey": service_key,
                "Authorization": f"Bearer {service_key}",
                "Content-Type": "application/json",
            }
            resp = httpx.get(
                f"{supa_url}/rest/v1/tasks",
                params={"user_id": f"eq.{user_id}", "order": "created_at.desc"},
                headers=hdrs,
            )
            if resp.status_code >= 400:
                raise Exception(resp.text)
            return {"tasks": resp.json()}
        else:
            response = supabase.table("tasks") \
                .select("*") \
                .eq("user_id", user_id) \
                .order("created_at", desc=True) \
                .execute()
            return {"tasks": response.data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/tasks")
def create_task(data: TaskCreate, supabase: Client = Depends(get_supabase)):
    """Create a new task"""
    try:
        service_key = os.getenv("SUPABASE_SERVICE_KEY")
        if service_key:
            supa_url = os.getenv("SUPABASE_URL", "")
            hdrs = {
                "apikey": service_key,
                "Authorization": f"Bearer {service_key}",
                "Content-Type": "application/json",
                "Prefer": "return=representation",
            }
            resp = httpx.post(
                f"{supa_url}/rest/v1/tasks",
                json={
                    "user_id": data.user_id,
                    "subject": data.subject,
                    "deadline": data.deadline,
                    "priority": data.priority,
                    "duration": data.duration,
                    "notes": data.notes,
                    "ai_enabled": data.ai_enabled,
                    "done": data.done,
                },
                headers=hdrs,
            )
            if resp.status_code >= 400:
                raise Exception(resp.text)
            created = resp.json()
            return {"message": "Task created", "task": created[0] if created else {}}
        else:
            response = supabase.table("tasks").insert({
                "user_id": data.user_id,
                "subject": data.subject,
                "deadline": data.deadline,
                "priority": data.priority,
                "duration": data.duration,
                "notes": data.notes,
                "ai_enabled": data.ai_enabled,
                "done": data.done,
            }).execute()
            return {"message": "Task created", "task": response.data[0]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.patch("/tasks/{task_id}")
def update_task(task_id: str, data: TaskUpdate, supabase: Client = Depends(get_supabase)):
    """Update a task (e.g. mark done, edit details)"""
    try:
        update_data = {k: v for k, v in data.dict().items() if v is not None}
        response = supabase.table("tasks") \
            .update(update_data) \
            .eq("id", task_id) \
            .execute()
        return {"message": "Task updated", "task": response.data[0]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.delete("/tasks/{task_id}")
def delete_task(task_id: str, supabase: Client = Depends(get_supabase)):
    """Delete a task"""
    try:
        supabase.table("tasks").delete().eq("id", task_id).execute()
        return {"message": "Task deleted"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
