// src/contexts/AuthContext.jsx
import { createContext, useReducer, useContext, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const initialState = {
  user: null,
  loading: true,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_USER': return { ...state, user: action.payload, loading: false, error: null };
    case 'LOGOUT': return { ...state, user: null, loading: false, error: null };
    case 'ERROR': return { ...state, error: action.payload, loading: false };
    case 'LOADING': return { ...state, loading: true };
    default: return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/me')
      .then(res => dispatch({ type: 'SET_USER', payload: res.data }))
      .catch(() => dispatch({ type: 'LOGOUT' }));
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'LOADING' });
    try {
      const res = await api.post('/auth/login', { email, password });
      dispatch({ type: 'SET_USER', payload: res.data });
      navigate('/dashboard');
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response?.data?.message || 'Login failed' });
    }
  };

  const register = async (name, email, password) => {
    dispatch({ type: 'LOADING' });
    try {
      const res = await api.post('/auth/register', { name, email, password });
      dispatch({ type: 'SET_USER', payload: res.data });
      navigate('/login');
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response?.data?.message || 'Registration failed' });
    }
  };

  const logout = async () => {
    await api.post('/auth/logout');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
