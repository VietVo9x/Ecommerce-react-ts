import { Req_CartUpdate } from '../../types/request.type';
import { deleteData, getData, updateData } from '../../utils/api.services';
import { _CART, _CART_CLEAR, _CART_DELETE_ITEM, _CART_UPDATE } from '../../utils/constant.api';

export class CartServices {
  getCart() {
    return getData(_CART);
  }
  updateProductCart(id: number, cartUpdate: Req_CartUpdate) {
    try {
      return updateData(_CART_UPDATE, id, cartUpdate);
    } catch (error) {
      throw error;
    }
  }
  deleteProductCart(id: number) {
    try {
      return deleteData(_CART_DELETE_ITEM, id);
    } catch (error) {
      throw error;
    }
  }
  clearCart() {
    try {
      return getData(_CART_CLEAR);
    } catch (error) {
      throw error;
    }
  }
}
