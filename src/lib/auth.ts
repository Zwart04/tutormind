export interface User {
  id: string;
  email: string;
  password: string; // plain text (local-only mock auth)
  username: string;
  name: string;
  avatar?: string;
  createdAt: number;
}

export interface StoredUser {
  id: string;
  email: string;
  username: string;
  name: string;
  avatar?: string;
  createdAt: number;
}

export const DEFAULT_USER: User = {
  id: "default-user",
  email: "user@example.com",
  password: "password",
  username: "tutor",
  name: "Tutor User",
  createdAt: Date.now(),
};

const USERS_KEY = "hf_users";
const CURRENT_USER_KEY = "hf_user";

export function getStoredUsers(): User[] {
  if (typeof window === "undefined") return [DEFAULT_USER];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [DEFAULT_USER];
    const users = JSON.parse(raw) as User[];
    return users.length > 0 ? users : [DEFAULT_USER];
  } catch {
    return [DEFAULT_USER];
  }
}

export function getCurrentUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export function login(email: string, password: string): StoredUser | null {
  if (typeof window === "undefined") return null;
  const users = getStoredUsers();
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) return null;

  const { password: _, ...safe } = found;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safe));
  return safe;
}

export function register(email: string, password: string, username: string, name: string): StoredUser | null {
  if (typeof window === "undefined") return null;
  const users = getStoredUsers();

  if (users.find((u) => u.email === email)) return null;
  if (users.find((u) => u.username === username)) return null;

  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    password,
    username,
    name,
    createdAt: Date.now(),
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const { password: _, ...safe } = newUser;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safe));
  return safe;
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function updateCurrentUser(updates: Partial<StoredUser>): StoredUser | null {
  if (typeof window === "undefined") return null;
  const current = getCurrentUser();
  if (!current) return null;

  const updated = { ...current, ...updates };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated));
  return updated;
}
