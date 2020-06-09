import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import SignInAndSignUpPage from '../pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Dashboard from '../pages/dashboard/dashboard.component';

const Routes = (props) => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/sign-in" component={SignInAndSignUpPage} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </section>
  );
};

export default Routes;
