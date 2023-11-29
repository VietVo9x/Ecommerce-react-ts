import { F_UserRegister } from '../../../types/form.type';
import { insertData } from '../../../utils/DB';
import { _USER_REGISTER } from '../../../utils/constantAPI';

export default class RegisterServices {
  register(dataForm: F_UserRegister) {
    try {
      const createUser = insertData(_USER_REGISTER, dataForm);
      return createUser;
    } catch (error) {
      throw error;
    }
  }

  validator(dataForm: F_UserRegister) {
    const error = {
      isError: false,
      msgEmail: '',
      msgUserName: '',
      msgPassword: '',
      msgPasswordConfirm: '',
    };

    //check mail
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!validRegex.test(dataForm.email)) {
      error.isError = true;
      error.msgEmail = 'Email is not in the correct format';
    }

    //check user name
    const regex = /^[a-zA-Z]*$/;
    if (!dataForm.user_name) {
      error.isError = true;
      error.msgUserName = 'User Name cannot be empty';
    } else if (dataForm.user_name.length < 6) {
      error.isError = true;
      error.msgUserName = 'User Name must be at least 6 characters';
    } else if (!regex.test(dataForm.user_name)) {
      error.isError = true;
      error.msgUserName = 'Username cannot contain special characters';
    }

    //check password
    if (!dataForm.password) {
      error.isError = true;
      error.msgPassword = 'Password cannot be empty';
    } else if (dataForm.password.length < 8) {
      error.isError = true;
      error.msgPassword = 'Password must be at least 8 characters long';
    }

    //check repeat password
    if (!dataForm.confirm_password) {
      error.isError = true;
      error.msgPasswordConfirm = 'Password confirmation cannot be empty';
    } else if (dataForm.confirm_password !== dataForm.password) {
      error.isError = true;
      error.msgPasswordConfirm = 'Password confirmation does not match';
    }

    // return all errors

    return error;
  }
}
