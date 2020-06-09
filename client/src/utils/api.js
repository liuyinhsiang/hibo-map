import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../redux/auth/auth.types';

const api = axios.create({
  baseURL: 'api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.data.message === 'Not authorized to access this route') {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;
