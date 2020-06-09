import api from '../../utils/api';
import { FETCH_USER, CREATE_USER } from './user.types';

export const fetchUser = () => async (dispatch) => {
  const res = await api.get('auth/me');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const createUser = (formValue) => async (dispatch) => {
  const res = await api.post('/');
};
