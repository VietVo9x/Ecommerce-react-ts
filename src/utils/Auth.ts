import { I_userLoginRedux } from '../redux/slice/AuthSlice';
import { UserEntities } from './../Entities/index';
import { getData } from './DB';

export default async function Auth() {
  const auth = localStorage.getItem('userLogin');
  if (auth) {
    const userLocal = JSON.parse(auth);
    const users = await getData('users');
    const user = users.find((user: UserEntities) => user.id === userLocal.id);

    const userLogin: I_userLoginRedux = {
      id: user.id,
      userName: user.userName,
    };
    return userLogin;
  }
}
