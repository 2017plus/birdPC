import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './components/util/History';
import PrivateRoute from './components/util/PrivateRoute';
import NotFound from './components/util/NotFoundContainer';
import LoginContainer from './components/login/LoginContainer';
import HomeContainer from './components/home/HomeContainer';
import RegisterContainer from './components/login/RegisterContainer';

export default class App extends Component {
  props: Props;

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <PrivateRoute exact path="/" component={HomeContainer} />
          <PrivateRoute exact path="/home" component={HomeContainer} />
          <Route exact path="/register" component={RegisterContainer} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
