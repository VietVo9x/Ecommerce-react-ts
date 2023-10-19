import { UserEntities } from './../Entities/index';
import { getData } from './DB';

export default async function Auth() {
  const auth = localStorage.getItem('token');
  if (auth) {
    const token = JSON.parse(auth);
    const users = await getData('users');
    const user = users.find((user: UserEntities) => user.token === token);
    delete user.password;
    return user;
  }
}
