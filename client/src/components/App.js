import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../redux/user/user.actions';
import { fetchDefaultMaps } from '../redux/map/map.actions';
import history from '../history';

import Header1 from './header/header.component';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Register from './Register';
import SignInAndSignUpPage from '../pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchDefaultMaps();
  }
  render() {
    return (
      <div>
        <Router history={history}>
          <Header1 />
          <Header />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/register" exact component={Register} />
            <Route
              path="/signin"
              exact
              render={() =>
                this.props.auth ? <Redirect to="/" /> : <SignInAndSignUpPage />
              }
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(null, { fetchUser, fetchDefaultMaps })(App);
