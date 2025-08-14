// src/pages/Login.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login, error, loading } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(form.email, form.password);
  }

  return (
    <div className="max-w-lg mx-auto mt-20 p-8 shadow-lg bg-white rounded">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="input" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="input" />
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 text-white py-2 px-4 rounded shadow hover:bg-blue-800">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
