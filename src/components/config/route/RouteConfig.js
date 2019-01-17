import HomeContainer from '../../home/HomeContainer';
import LoginContainer from '../../login/LoginContainer';

export default [
  { path: '/', component: HomeContainer, auth: true },
  { path: '/login', component: LoginContainer, auth: false },
  { path: '/home', component: HomeContainer, auth: true }
];
