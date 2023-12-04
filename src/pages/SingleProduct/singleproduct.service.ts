import { Req_ProductCart } from '../../types/request.type';
import { getDataForID, insertData } from '../../utils/api.services';
import { _CART_CREATE, _PRODUCT } from '../../utils/constant.api';

export class SingleProductServices {
  async getProduct(id: string | number) {
    try {
      const product = await getDataForID(_PRODUCT, id);
      return product;
    } catch (error) {
      throw error;
    }
  }
  async createCart(product: Req_ProductCart) {
    try {
      return await insertData(_CART_CREATE, product);
    } catch (error) {
      throw error;
    }
  }
}