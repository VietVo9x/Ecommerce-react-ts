import { Req_UserUpdate } from '../../types/request.type';
import { updateData } from '../../utils/api.services';
import { _USER } from '../../utils/constant.api';

export default class AccountService {
  async UpdateInfo(id: number, dataForm: Req_UserUpdate) {
    return await updateData(_USER + '/', id, dataForm);
  }
  UpdatePassword() {}
  UpdateAvatar() {}
}
