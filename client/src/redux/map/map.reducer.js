import { FETCH_DEFAULT_MAPS } from './map.types';

const INITIAL_STATE = { defaultMaps: null };

const mapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DEFAULT_MAPS:
      return { ...state, defaultMaps: action.payload };
    default:
      return state;
  }
};

export default mapReducer;
