// src/contexts/JobsContext.jsx
import { createContext, useReducer, useContext, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const JobsContext = createContext();

const initialState = {
  jobs: [],
  loading: true,
  error: null,
};

function jobsReducer(state, action) {
  switch (action.type) {
    case 'SET_JOBS': return { ...state, jobs: action.payload, loading: false, error: null };
    case 'ADD_JOB': return { ...state, jobs: [action.payload, ...state.jobs], error: null };
    case 'UPDATE_JOB': return { ...state, jobs: state.jobs.map(j => j._id === action.payload._id ? action.payload : j) };
    case 'DELETE_JOB': return { ...state, jobs: state.jobs.filter(j => j._id !== action.payload) };
    case 'ERROR': return { ...state, error: action.payload, loading: false };
    case 'LOADING': return { ...state, loading: true };
    default: return state;
  }
}

export function JobsProvider({ children }) {
  const [state, dispatch] = useReducer(jobsReducer, initialState);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      dispatch({ type: 'LOADING' });
      api.get('/jobs')
        .then(res => dispatch({ type: 'SET_JOBS', payload: res.data }))
        .catch(() => dispatch({ type: 'ERROR', payload: 'Failed to load jobs' }));
    }
  }, [user]);

  const addJob = async (company, position) => {
    const res = await api.post('/jobs', { company, position });
    dispatch({ type: 'ADD_JOB', payload: res.data });
  };

  const updateJob = async (id, jobData) => {
    const res = await api.put(`/jobs/${id}`, jobData);
    dispatch({ type: 'UPDATE_JOB', payload: res.data });
  };

  const deleteJob = async (id) => {
    await api.delete(`/jobs/${id}`);
    dispatch({ type: 'DELETE_JOB', payload: id });
  };

  return (
    <JobsContext.Provider value={{ ...state, addJob, updateJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
}

export const useJobs = () => useContext(JobsContext);
