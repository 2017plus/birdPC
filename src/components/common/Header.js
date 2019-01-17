import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import logo from '../../resource/images/logo.png';

const { SubMenu } = Menu;
const { Header } = Layout;

const styles = {
  header: {
    display: 'flex',
    padding: 0
  },
  logo: {
    width: 200,
    height: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImg: {
    height: '100%',
    verticalAlign: 'top',
    backgroundColor: '#001529'
  }
};

export default class CommonHeader extends Component {
  state = {
    oneCategory: [
      {
        icon: <Icon type="home" />,
        title: '首页',
        link: '/home'
      },
      {
        icon: <Icon type="read" />,
        title: '博客',
        link: '/blog'
      },
      {
        icon: <Icon type="cloud-download" />,
        title: '资源',
        link: '/resource'
      },
      {
        icon: <Icon type="tool" />,
        title: '其他',
        link: '/other'
      }
    ],
    subMenuCategory: [
      {
        icon: <Icon type="user" />,
        title: '个人中心',
        link: '/mine'
      },
      {
        icon: <Icon type="setting" />,
        title: '系统设置',
        link: '/setting'
      },
      {
        icon: <Icon type="poweroff" />,
        title: '注销登录',
        link: '/login'
      }
    ],
    current: 'mail'
  };

  // 下拉Menu点击事件
  _subMenuClick = e => {
    if (e.key === '/login') {
      localStorage.removeItem('x-auth-token');
    } else {
      this.setState({
        current: e.key
      });
    }
  };

  // 点击一级目录
  _clickMenu = ({ item, key, keyPath }) => {};

  render() {
    const { oneCategory, subMenuCategory } = this.state;
    return (
      <Header style={styles.header}>
        <div className="logo" style={styles.logo}>
          <Link to="/">
            <img src={logo} alt="bird want fly" style={styles.logoImg} />
          </Link>
        </div>
        <div style={{ flex: 1 }}>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
            onClick={this._clickMenu}
          >
            {oneCategory.map((item, i) => (
              <Menu.Item key={item.link}>
                <Link to={item.link}>
                  {item.icon}
                  {item.title}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <div style={{ alignSelf: 'center', padding: 10 }}>
          <Menu
            onClick={this._subMenuClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            theme="dark"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="appstore" />
                  我的
                </span>
              }
            >
              {subMenuCategory.map((item, i) => (
                <Menu.Item key={item.link}>
                  <Link to={item.link}>
                    {item.icon}
                    {item.title}
                  </Link>
                </Menu.Item>
              ))}
            </SubMenu>
          </Menu>
        </div>
      </Header>
    );
  }
}
