import { combineReducers } from 'redux';

import authReducer from './user/user.reducer';
import mapReducer from './map/map.reducer';

export default combineReducers({
  auth: authReducer,
  defaultMaps: mapReducer,
});
