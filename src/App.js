import React, { Component } from 'react';
import { Router,Switch,Route } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './components/util/History';
import PrivateRoute from './components/util/PrivateRoute';
import NotFound from './components/util/NotFoundContainer';
import LoginContainer from './components/login/LoginContainer';
import HomeContainer from './components/home/HomeContainer';

type Props = {
  token: string,
}

class App extends Component {
  props: Props;

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/login' component={LoginContainer} />
          <PrivateRoute exact path='/' component={HomeContainer} />
          <PrivateRoute exact path='/home' component={HomeContainer} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.login.userInfo,
});

export default connect(mapStateToProps)(App);
