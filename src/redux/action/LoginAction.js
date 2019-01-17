import { serverUrl } from '../../components/config/env';
import history from '../../components/util/History';
import {message} from 'antd';

export function loginAction(params, props) {
  return async (dispatch, getState) => {
    dispatch({ type: 'LOGIN_POST_REQUEST' });
    await fetch(`${serverUrl}/bird/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(json => {
        if (json.code > 0 && json.result && json.result.length > 0) {
          message.success(json.note);
          localStorage.setItem('x-auth-token', json.result[0].token);
          history.push('/');
          dispatch({ type: 'LOGIN_POST_SUCCESS', json });
        } else {
          dispatch({ type: 'LOGIN_POST_FAILURE', json });
          message.error(json.note);
        }
      })
      .catch(err => console.error(err));
    //这里的type一定要全局唯一,因为状态变一次每个Reducer都会根据类型比对一遍
  };
}
