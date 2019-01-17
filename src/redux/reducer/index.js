import { combineReducers } from 'redux'; // 将reducer组合起来(状态分而治之，便于管理)
import login from './login';
// import home from './home';

let reducers = combineReducers({
  ...login
});
export default reducers;
