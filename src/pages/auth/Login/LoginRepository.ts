import { UserEntities } from '../../../Entities';
import { getData, patchData } from '../../../utils/DB';

export class LoginRepository {
  getAllUser() {
    const users = getData('users');
    return users;
  }
  //them moi
  updateUser(data: UserEntities, id: string) {
    const response = patchData('users/', id, data);
    return response;
  }
}
