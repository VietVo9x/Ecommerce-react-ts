import { I_UserRegister } from '../../../types/RegisterType';
// Các event trong trang register

import RegisterServices from './RegisterServices';

const registerServices = new RegisterServices();
class RegisterEvent {
  onRegister(dataForm: I_UserRegister) {
    // validator form --> status
    const errorResponse = registerServices.validator(dataForm);

    if (errorResponse.isError) {
      // trả về lỗi

      return errorResponse;
    }

    // --> đăng ký --> status, data, message
    const registerResponse = registerServices.register(dataForm);

    if (registerResponse.status === 'success') {
      return;
    } else {
      return;
    }
  }
}

export default RegisterEvent;
