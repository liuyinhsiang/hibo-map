import { combineReducers } from 'redux';

import alertReducer from './alert/alert.reducer';
import authReducer from './auth/auth.reducer';
import mapReducer from './map/map.reducer';

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  defaultMaps: mapReducer,
});
