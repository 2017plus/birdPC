import { serverUrl } from '../../components/config/env';
import history from '../../components/util/History';
import { message } from 'antd';
import { POST } from '../../components/util/request';

export function loginAction(params, props) {
  return (dispatch, getState) => {
    dispatch({ type: 'LOGIN_POST_REQUEST' });
    POST(`${serverUrl}/bird/login`, 10000, {
      loginName: params.loginName,
      loginPassword: params.loginPassword
    })
      .then(json => {
        if (json.code > 0 && json.result && json.result.length > 0) {
          message.success(json.note);
          localStorage.setItem('x-auth-token', json.result[0].token);
          history.push('/');
          dispatch({ type: 'LOGIN_POST_SUCCESS', json });
        } else {
          dispatch({ type: 'LOGIN_POST_FAILURE', json });
          message.error(json.note || json.message);
        }
      })
      .catch(error => {
        if (Number(error.message) >= 500) {
          dispatch({ type: 'LOGIN_POST_FAILURE', error });
          message.error('服务器异常',1);
        } else {
          dispatch({ type: 'LOGIN_POST_FAILURE', error });
          message.error('服务器连接失败',1);
        }
      });
  };
}
