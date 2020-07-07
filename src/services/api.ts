import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'x-app-id': process.env.APP_ID,
    'x-app-key': process.env.APP_KEY,
  },
});

export default api;
