import { F_ProductCart } from '../../types/form.type';
import { getDataForID, insertData } from '../../utils/DB';
import { _CART_CREATE, _PRODUCT } from '../../utils/constantAPI';

export class SingleProductServices {
  async getProduct(id: string | number) {
    try {
      const product = await getDataForID(_PRODUCT, id);
      return product;
    } catch (error) {
      throw error;
    }
  }
  async createCart(product: F_ProductCart) {
    try {
      return await insertData(_CART_CREATE, product);
    } catch (error) {
      throw error;
    }
  }
}
