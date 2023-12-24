import { Req_Checkout_Address } from '../../types/request.type';
import { postData } from '../../utils/api.services';
import { _ORDER } from '../../utils/constant.api';

export default class checkoutService {
  createOrder(addressForm: Req_Checkout_Address) {
    try {
      return postData(_ORDER, addressForm);
    } catch (error) {
      throw error;
    }
  }
}
