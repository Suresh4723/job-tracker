// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-blue-900 text-white shadow-md">
      <Link to="/" className="font-bold text-xl tracking-tight">JobTrackr</Link>
      <div className="flex items-center gap-4">
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user && <button
          onClick={logout}
          className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition">Logout</button>}
        {!user && (
          <>
            <Link to="/login" className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition">Login</Link>
            <Link to="/register" className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
