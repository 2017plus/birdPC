import React, { Component } from 'react';
import { Route,Redirect } from 'react-router-dom';

export default class PrivateRoute extends Component {
  render () {
    const auth = localStorage.getItem('x-auth-token')?true: false;
    return(
      auth ? <Route {...this.props} /> : <Redirect to="/login" />      
    );
  }
}