// src/pages/Register.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { register, error, loading } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    register(form.name, form.email, form.password);
  }

  return (
    <div className="max-w-lg mx-auto mt-20 p-8 shadow-lg bg-white rounded">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required className="input" />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="input" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="input" />
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 text-white py-2 px-4 rounded shadow hover:bg-blue-800">
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
