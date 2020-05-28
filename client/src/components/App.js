import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import history from '../history';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Register from './Register';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <Header />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect(null, actions)(App);
