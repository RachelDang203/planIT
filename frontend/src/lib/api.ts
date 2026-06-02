const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Something went wrong');
  }

  return data as T;
}

// ─── Auth ───────────────────────────────────────────────────────────────────

export async function signup(name: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  console.log('🔵 [api.signup] response:', res.status, data);

  if (!res.ok) {
    throw new Error(data.detail || 'Signup failed');
  }

  return data as {
    message: string;
    user_id: string;
    name: string;
    email: string;
  };
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log('🔵 [api.login] response:', res.status, data);

  if (!res.ok) {
    throw new Error(data.detail || 'Login failed');
  }

  return data as {
    message: string;
    user_id: string;
    name: string;
    email: string;
    access_token: string;
  };
}

// ─── Tasks ──────────────────────────────────────────────────────────────────

export async function getTasks(userId: string) {
  console.log('🔵 [api.getTasks] userId:', userId);
  const res = await fetch(`${API_URL}/tasks/${userId}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  console.log('🔵 [api.getTasks] response:', res.status, data);
  if (!res.ok) throw new Error(data.detail || 'Get tasks failed');
  return data as { tasks: import('../types/task').PlanITTask[] };
}

export async function createTask(taskData: {
  user_id: string;
  subject: string;
  deadline: string;
  priority: string;
  duration: number;
  notes?: string;
  ai_enabled?: boolean;
  done?: boolean;
}) {
  console.log('🔵 [api.createTask] sending:', taskData);
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  const data = await res.json();
  console.log('🔵 [api.createTask] response:', res.status, data);
  if (!res.ok) throw new Error(data.detail || 'Create task failed');
  return data as { message: string; task: import('../types/task').PlanITTask };
}

export function updateTask(
  taskId: string,
  data: Record<string, unknown>,
) {
  return request<{ message: string; task: import('../types/task').PlanITTask }>(
    `/tasks/${taskId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
    },
  );
}

export function deleteTask(taskId: string) {
  return request<{ message: string }>('/tasks/' + taskId, {
    method: 'DELETE',
  });
}