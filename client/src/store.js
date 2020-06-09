import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import rootReducer from './redux/root-reducer';
import setAuthToken from './utils/setAuthToken';

const middlewares = [reduxThunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

let currentState = store.getState();

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();

  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

export default store;
