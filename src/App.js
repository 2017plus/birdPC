import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './components/util/History';
import PrivateRoute from './components/util/PrivateRoute';
import NotFound from './components/util/NotFoundContainer';
import LoginContainer from './components/login/LoginContainer';
import IndexContainer from './components/home/IndexContainer';
import RegisterContainer from './components/login/RegisterContainer';
import AdminContainer from './components/admin/AdminContainer';
import Footer from './components/common/Footer';
const windowHeight = document.body.clientHeight;

export default class App extends Component {
  props: Props;

  render() {
    return (
      <div
        style={{
          minHeight: windowHeight,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ flex: 1 }}>
          <Router history={history}>
            <Switch>
              <Route exact path="/login" component={LoginContainer} />
              <Route exact path="/register" component={RegisterContainer} />
              <Route exact path="/admin" component={AdminContainer} />
              <PrivateRoute path="/" component={IndexContainer} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>

        <Footer />
      </div>
    );
  }
}
