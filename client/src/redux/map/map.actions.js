import axios from 'axios';
import { FETCH_DEFAULT_MAPS } from './map.types';

export const fetchDefaultMaps = () => async (dispatch) => {
  const res = await axios.get('api/v1/maps/default');
  if (res.data.count > 0) {
    dispatch({ type: FETCH_DEFAULT_MAPS, payload: res.data.data });
  }
};
