import React, { Component } from 'react';
import { Carousel, Card } from 'antd';
import './home.css';

class HomeContainer extends Component {
  state = {};

  render() {
    return (
      <div style={{ flex: 1,display: 'flex',flexDirection: 'column',alignItems: 'center' }}>
        <div
          style={{
            flex: 1,
            width: '80%',
            backgroundColor: '#fff'
          }}
        >
        </div>
      </div>
    );
  }
}

export default HomeContainer;
