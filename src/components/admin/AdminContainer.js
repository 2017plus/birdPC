import React, { Component } from 'react';
import 'antd/dist/antd.css';

const windowWidth = document.body.clientHeight;

const styles = {
  container: {
    height: windowWidth,
    display: 'flex',
    flexDirection: 'column'
  },
};

class AdminContainer extends Component {

  render() {
    return (
      <div style={styles.container}>
        后台
      </div>
    );
  }
}

export default AdminContainer;
