import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NotFoundContainer extends Component {
  render() {
    return <div style={{flex: 1}}>404</div>;
  }
}

export default withRouter(NotFoundContainer);
