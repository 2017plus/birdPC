import { Layout } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './home.css';
import Header from '../common/Header';
import Footer from '../common/Footer';
const windowWidth = document.body.clientHeight;

const { Content } = Layout;

class HomeContainer extends Component {
  state = {};

  render() {
    return (
      <div
        style={{
          minHeight: windowWidth,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Header />
        <Content style={{ flex: 1 }}>
          <div >12</div>
        </Content>

        <Footer />
      </div>
    );
  }
}

export default HomeContainer;
