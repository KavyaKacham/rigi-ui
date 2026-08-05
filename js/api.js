// js/api.js
// Talks to the Rigital backend running at http://localhost:3000
// Matches routes/auth.js exactly: POST /signup, POST /login, GET /me

const API_BASE_URL = 'http://localhost:3000/api';

const RigitalAPI = {
  async signup(fullName, email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Signup failed.');
    return data; // { token, user: { id, fullName, email } }
  },

  async login(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed.');
    return data; // { token, user: { id, fullName, email } }
  },

  async me() {
    const token = localStorage.getItem('rigital_token');
    if (!token) return null;

    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user;
  },

  logout() {
    localStorage.removeItem('rigital_token');
    localStorage.removeItem('rigital_user');
  }
};