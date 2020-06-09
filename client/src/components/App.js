import React, { Fragment, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// import { fetchDefaultMaps } from '../redux/map/map.actions';
import Routes from '../routes/Routes';
import history from '../history';

import Header from './header/header.component';
import Landing from '../pages/landing/Landing.component';

// Redux
import { loadUser } from '../redux/auth/auth.actions';
import store from '../store';
import setAuthToken from '../utils/setAuthToken';

import './App.css';

const App = ({ auth: { isAuthenticated } }) => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// export default connect(null, { fetchUser, fetchDefaultMaps })(App);
export default connect(mapStateToProps)(App);
