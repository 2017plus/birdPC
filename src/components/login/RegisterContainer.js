import React, { Component } from 'react';
import { Form, Input, Checkbox, Button, Spin, message, Modal } from 'antd';
import { Link } from 'react-router-dom';
import history from '../util/History';
import { serverUrl } from '../config/env';
import { Encrypt } from '../util/AES';

const windowWidth = document.body.clientHeight;

class RegisterContainer extends Component {
  state = {
    confirmDirty: false,
    isLoading: false
  };

  // 确认密码
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  // 对比第一次输入的密码
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致!');
    } else {
      callback();
    }
  };

  // 对比确认的密码
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    const reg = /^[a-zA-Z\d]{6,30}$/;
    if (!reg.test(value)) {
      callback('密码必须是包含字母、数字的6-30个字符!');
    } else if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  // 用户合法性检验
  _userValidate = (rule, value, callback) => {
    const reg = /^[a-zA-Z_\d]{6,20}$/;
    if (value && !reg.test(value)) {
      callback('用户名必须是包含字母、数字、下划线的6-20个字符!');
    } else if (value && reg.test(value)) {
      fetch(`${serverUrl}/bird/registerNameCheck`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `loginName=${value}`
      })
        .then(response => response.json())
        .then(json => {
          if (json.code > 0) {
            callback();
          } else {
            callback(json.note);
          }
        })
        .catch(err => console.error(err));
    } else {
      callback();
    }
  };

  // 立即登录
  _login = () => {
    history.push('/login');
  };

  // 提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          isLoading: true
        });
        const params = {
          loginName: values.loginName,
          loginPassowrd: Encrypt(values.password),
          email: values.email
        };
        fetch(`${serverUrl}/bird/register`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        })
          .then(response => response.json())
          .then(json => {
            if (json.code > 0) {
              let secondsToGo = 3;
              const modal = Modal.success({
                title: '注册成功',
                content: 'Bird社区欢迎您！3秒后前往登录页',
                okText: '立即登录',
                onOk: this._login
              });
              const timer = setInterval(() => {
                secondsToGo -= 1;
                modal.update({
                  content: `Bird社区欢迎您！${secondsToGo}秒后前往登录页`
                });
              }, 1000);
              setTimeout(() => {
                clearInterval(timer);
                modal.destroy();
                this._login();
              }, secondsToGo * 1000);
            } else {
              this.setState({ isLoading: false });
              message.error(json.note);
            }
          })
          .catch(err => console.error(err));
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
        offset: 6
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 10
        }
      }
    };

    return (
      <div
        style={{
          minHeight: windowWidth,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} colon={false} label=" ">
              <div style={{ fontSize: 44 }}>欢迎注册bird</div>
            </Form.Item>
            <Form.Item {...formItemLayout} colon={false} label=" ">
              <div style={{ fontSize: 28 }}>每一天，乐在分享。</div>
            </Form.Item>

            <Form.Item {...formItemLayout} label="用户名">
              {getFieldDecorator('loginName', {
                rules: [
                  {
                    required: true,
                    message: '请输入您的用户名!'
                  },
                  {
                    validator: this._userValidate
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: '请输入您的邮箱!'
                  },
                  {
                    type: 'email',
                    message: '请输入正确格式的邮箱!'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="密码">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码!'
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password type="password" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="确认密码">
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请确认密码!'
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input.Password
                  type="password"
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
                rules: [{ required: true, message: '请同意注册协议' }]
              })(
                <Checkbox>
                  我已阅读并同意相关服务条款和隐私政策
                  <a href="/">《bird用户注册协议》</a>
                </Checkbox>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Spin
                tip="Loading..."
                delay={500}
                spinning={this.state.isLoading}
              >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Button type="primary" htmlType="submit">
                    立即注册
                  </Button>
                  <div style={{ marginLeft: 100 }}>
                    已有账号？<Link to="/login">立即登录!</Link>
                  </div>
                </div>
              </Spin>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create({ name: 'register' })(RegisterContainer);
