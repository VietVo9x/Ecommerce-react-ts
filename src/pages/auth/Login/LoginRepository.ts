import { getData, getDataForID } from '../../../utils/DB';

export class LoginRepository {
  //get all
  getAllUser() {
    const users = getData('users');
    return users;
  }
  //login
  postUser(id: string) {
    const response = getDataForID('users', id);
    return response;
  }
}
