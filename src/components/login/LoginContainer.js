import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import Actions from '../../redux/action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Spin } from 'antd';
import 'antd/dist/antd.css';
import Footer from '../common/Footer';
import { Encrypt } from '../util/AES';

const windowWidth = document.body.clientHeight;

const styles = {
  container: {
    height: windowWidth,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: 20,
    marginBottom: 20
  },
  form: {
    maxWidth: 400,
    minWidth: 250
  },
  forgot: {
    float: 'right'
  },
  loginBtn: {
    width: '100%'
  }
};

class LoginContainer extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          loginName: values.userName,
          loginPassword: Encrypt(values.password)
        };
        this.props.action.loginAction(params, this.props);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={styles.container}>
        <div
          style={{
            flex: 1,
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div style={styles.title}>bird want fly</div>
          <Form onSubmit={this.handleSubmit} style={styles.form}>
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [
                  { required: true, message: '请输入用户名或邮箱!' },
                  {
                    pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@?([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){0,63}[a-z0-9]+$/,
                    message: '请检查您的用户名是否正确!'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  size="large"
                  allowClear
                  placeholder="请输入用户名/邮箱"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }]
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  size="large"
                  type="password"
                  placeholder="请输入密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>记住密码</Checkbox>)}
              <Link style={styles.forgot} to="/forgetPassowrd">
                忘记密码
              </Link>
              <Spin
                tip="Loading..."
                spinning={this.props.isLoading}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={styles.loginBtn}
                >
                  登 录
                </Button>
              </Spin>
              没有账号？<Link to="/register">立即注册!</Link>
            </Form.Item>
          </Form>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.login.userInfo,
    isLoading: state.login.isLoading
  };
};
//将引入的Actions绑定,使当前展现层具备 请求数据的能力,需要什么数据,就请求对应的 方法名(这就是为什么腔调actions/office.js 中的每个action 名称一定要全局唯一,还是那句话,这个页面可能需要多个子action的数据能力作为数据集中展现的基础)
const mapDispatchToProps = dispatch => {
  return {
    action: bindActionCreators(Actions, dispatch)
  };
};
//最重要一步 通过react-redux 提供的 connect函数将 需要的 Reducer和Actions 绑定至 当前页面
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(LoginContainer));
