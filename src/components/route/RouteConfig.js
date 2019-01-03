import HomeContainer from '../home/HomeContainer';
import LoginContainer from '../login/LoginContainer';

export default [
  { path: '/login', exact: true, name: 'Login', component: LoginContainer },
  { path: '/home', name: 'Home', component: HomeContainer }
];
