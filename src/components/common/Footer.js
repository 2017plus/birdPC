import React, { Component } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

const { Footer } = Layout;

export default class CommonHeader extends Component {
  render() {
    return (
      <Footer
        style={{
          textAlign: 'center',
          minWidth: '100%',
          height: 68,
          marginTop: -68,
        }}
      >
        Bird ©2018 Created by Lily
      </Footer>
    );
  }
}
