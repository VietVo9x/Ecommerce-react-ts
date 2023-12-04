import { Req_Checkout_Address } from '../../types/request.type';
import { insertData } from '../../utils/api.services';
import { _ORDER_CREATE } from '../../utils/constant.api';

export default class checkoutService {
  createOrder(addressForm: Req_Checkout_Address) {
    try {
      return insertData(_ORDER_CREATE, addressForm);
    } catch (error) {
      throw error;
    }
  }
}
