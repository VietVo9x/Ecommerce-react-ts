import { I_UserEntity } from '../../../types/EntityType';
import { I_UserRegister } from '../../../types/RegisterType';
import RegisterRepository from './RegisterRepository';

export {};

const registerRepository = new RegisterRepository();
export default class RegisterServices {
  register(dataForm: I_UserRegister) {
    const entity_user: I_UserEntity = {
      email: dataForm.email,
      password: dataForm.password,
      userName: dataForm.userName,
      fullName: dataForm.fullName,
      phone: dataForm.phone,
      address: dataForm.address,
      role: false,
      status: true,
      created_at: new Date().toUTCString(),
      update_at: new Date().toUTCString(),
    };

    const users = registerRepository.getAllUser();
    const userExists = users.find((item) => item.email === entity_user.email);

    if (!userExists) {
      const ret = registerRepository.insertUser(entity_user);

      if (ret) {
        return {
          status: 'success',
          data: ret,
          message: 'Đăng ký thành công',
        };
      }
      return {
        status: 'failure',
        data: ret,
        message: 'Đăng ký thất bại',
      };
    }

    return {
      status: 'failure',
      message: 'Email đã tồn tại, vui lòng đăng nhập hoặc đăng ký bằng một tài khoản khác',
    };
  }

  validator(dataForm: I_UserRegister) {
    const error = {
      isError: false,
      msgError: {
        msgEmail: '',
        msgPhone: '',
        msgUserName: '',
        msgFullName: '',
        msgAddress: '',
        msgPassword: '',
        msgPasswordConfirm: '',
      },
    };

    //check mail
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!dataForm.email) {
      error.isError = true;
      error.msgError.msgEmail = 'Email cannot be empty';
    } else if (!validRegex.test(dataForm.email)) {
      error.isError = true;
      error.msgError.msgEmail = 'Email is not in the correct format';
    }

    //check  phone
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!dataForm.phone) {
      error.isError = true;
      error.msgError.msgPhone = 'Phone number cannot be empty';
    } else if (!dataForm.phone.match(regexPhoneNumber)) {
      error.isError = true;
      error.msgError.msgPhone = 'Phone does not match the VN phone format';
    }

    //check user name
    const regex = /^[a-zA-Z]*$/;
    if (!dataForm.userName) {
      error.isError = true;
      error.msgError.msgUserName = 'User Name cannot be empty';
    } else if (dataForm.userName.length < 6) {
      error.isError = true;
      error.msgError.msgUserName = 'User Name must be at least 6 characters';
    } else if (!regex.test(dataForm.userName)) {
      error.isError = true;
      error.msgError.msgUserName = 'Username cannot contain special characters';
    }

    //check fullName
    if (!dataForm.fullName) {
      error.isError = true;
      error.msgError.msgFullName = 'Full Name cannot be empty';
    }

    //check address
    if (!dataForm.address) {
      error.isError = true;
      error.msgError.msgAddress = 'Address cannot be empty';
    }

    //check password
    if (!dataForm.password) {
      error.isError = true;
      error.msgError.msgPassword = 'Password cannot be empty';
    } else if (dataForm.password.length < 6) {
      error.isError = true;
      error.msgError.msgPassword = 'Password must be at least 6 characters long';
    }

    //check repeat password
    if (!dataForm.repeatPassword) {
      error.isError = true;
      error.msgError.msgPasswordConfirm = 'Password confirmation cannot be empty';
    } else if (dataForm.repeatPassword !== dataForm.password) {
      error.isError = true;
      error.msgError.msgPasswordConfirm = 'Password confirmation does not match';
    }

    //return all errors
    return error;
  }
}
