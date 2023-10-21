import { LoginRepository } from './LoginRepository';
import { I_UserLogin } from '../../../types/LoginType';
import md5 from 'md5';
import { UserEntities } from '../../../Entities';
const loginRepository = new LoginRepository();
export class LoginServices {
  async onLogin(dataForm: I_UserLogin) {
    const users = await loginRepository.getAllUser();
    const user = users.find((user: UserEntities) => {
      if (user.email == dataForm.email) {
        if (user.password == md5(dataForm.password)) {
          return true;
        }
      }
    });
    if (user) {
      const login = await loginRepository.postUser(user.id);

      return login;
    }
  }
  async validator(dataForm: I_UserLogin) {
    const error = {
      isError: false,
      msgEmail: '',
      msgPassword: '',
    };

    //check mail
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!validRegex.test(dataForm.email)) {
      error.isError = true;
      error.msgEmail = 'Email is not in the correct format';
    }

    //check password
    if (!dataForm.password) {
      error.isError = true;
      error.msgPassword = 'Password cannot be empty';
    } else if (dataForm.password.length < 6) {
      error.isError = true;
      error.msgPassword = 'Password must be at least 6 characters long';
    }
    //check email databas
    const users = await loginRepository.getAllUser();
    const user = users.find((user: UserEntities) => {
      if (user.email == dataForm.email) {
        if (user.password == md5(dataForm.password)) {
          return true;
        }
      }
    });
    if (user) {
      return error;
    } else {
      error.isError = true;
      error.msgEmail = 'Email or password is incorrect.';
    }
    // return all error
    return error;
  }
}
