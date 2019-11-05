import { Layout } from 'antd';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import {footerHeight} from '../config/System';
import Header from '../common/Header';
import HomeContainer from './HomeContainer';
import PrivateRoute from '../util/PrivateRoute';
import BlogContainer from '../blog/BlogContainer';
import ResourceContainer from '../resource/ResourceContainer';
import OtherContainer from '../other/OtherContainer';
import MineContainer from '../mime/MineContainer';
import NotFound from '../util/NotFoundContainer';
import BlogEdit from '../blog/BlogEdit';
const windowHeight = document.body.clientHeight;

const { Content } = Layout;

class IndexContainer extends Component {
  state = {};

  render() {
    return (
      <div
        style={{
          minHeight: windowHeight,
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: footerHeight
        }}
      >
        <Header />
        <Content style={{ flex: 1 }}>
          <Switch>
            <PrivateRoute exact path="/" component={HomeContainer} />
            <PrivateRoute exact path="/home" component={HomeContainer} />
            <PrivateRoute exact path="/blog" component={BlogContainer} />
            <PrivateRoute exact path="/blogEdit" component={BlogEdit} />
            <PrivateRoute
              exact
              path="/resource"
              component={ResourceContainer}
            />
            <PrivateRoute exact path="/other" component={OtherContainer} />
            <PrivateRoute exact path="/mine" component={MineContainer} />
            <Route component={NotFound} />
          </Switch>
        </Content>
      </div>
    );
  }
}

export default IndexContainer;
