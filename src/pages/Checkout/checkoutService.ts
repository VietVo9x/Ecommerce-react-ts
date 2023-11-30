import { Req_Checkout_Address } from '../../types/request.type';

export default class checkoutService {
  validator(dataForm: Req_Checkout_Address) {
    const errors = {
      isError: false,
      msgFullName: '',
      msgAddress: '',
      msgPhone: '',
      msgProvince: '',
      msgCity: '',
    };
    if (!dataForm.full_name) {
      errors.isError = true;
      errors.msgFullName = 'Please enter a full name';
    } else if (dataForm.full_name.length > 100) {
      errors.isError = true;
      errors.msgFullName = 'Full name must be at least 100 characters';
    }

    if (!dataForm.address) {
      errors.isError = true;
      errors.msgAddress = 'Please enter a address';
    } else if (dataForm.address.length > 100) {
      errors.isError = true;
      errors.msgAddress = 'Address must be at least 100 characters';
    }

    if (!dataForm.phone) {
      errors.isError = true;
      errors.msgPhone = 'Please enter a phone';
    } else if (dataForm.address.length > 100) {
      errors.isError = true;
      errors.msgPhone = 'Phone must be at least 100 characters';
    }

    if (!dataForm.province) {
      errors.isError = true;
      errors.msgProvince = 'Please enter a Province';
    } else if (dataForm.province.length > 100) {
      errors.isError = true;
      errors.msgProvince = 'Provine must be at least 100 characters';
    }

    if (!dataForm.city) {
      errors.isError = true;
      errors.msgCity = 'Please enter a City';
    } else if (dataForm.address.length > 100) {
      errors.isError = true;
      errors.msgCity = 'City must be at least 100 characters';
    }
    return errors;
  }
  getCart() {}
  payment() {}
}
