import axios from 'axios';

const api = axios.create({
  baseURL: 'https://job-tracker-77v7.onrender.com/api',
  withCredentials: true,
});

export default api;
