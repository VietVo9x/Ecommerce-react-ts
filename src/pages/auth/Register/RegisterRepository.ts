import { insertData } from './../../../utils/DB';
import { I_UserEntity } from '../../../types/EntityType';
import { getData } from '../../../utils/DB';

export default class RegisterRepository {
  getAllUser() {
    const users = getData('users');
    return users;
  }
  insertData(data: I_UserEntity) {
    const response = insertData('users', data);
    return response;
  }
}
