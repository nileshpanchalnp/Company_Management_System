import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/';

// 🔐 Attach token automatically
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
