import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore, compose, applyMiddleware } from 'redux'; //createStore用来创建store的   applyMiddleware用来处理 ajax异步请求的！
import thunk from 'redux-thunk'; //用于异步处理
import { Provider } from 'react-redux'; //用于将仓库的数据传到组件中
import reducers from './redux/reducer'; //将各个reducer通过combineReducers()方法组装成reducers
import * as serviceWorker from './serviceWorker';
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk), //解决redux异步问题
    window.devToolsExtension ? window.devToolsExtension() : f => f // chrome控制台redux工具
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
