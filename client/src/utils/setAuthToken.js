import api from './api';

const setAuthToken = (token) => {
  if (token) {
    const bearer = `Bearer ${token}`;
    api.defaults.headers.common['Authorization'] = bearer;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
