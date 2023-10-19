import { UserEntities } from '../../../Entities';
import { getData, insertData, patchData } from '../../../utils/DB';

export class LoginRepository {
  getAllUser() {
    const users = getData('users');
    return users;
  }
  //them moi
  updateUser(data: UserEntities) {
    const response = patchData('users/' + data.id, data);
    return response;
  }
}
