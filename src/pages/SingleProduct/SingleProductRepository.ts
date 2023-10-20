import { ProductEntities, UserEntities } from './../../Entities/index';
import { getData, patchData } from '../../utils/DB';

export class SingleProductRepository {
  getAllUsers() {
    const users = getData('users');
    return users;
  }
  getAllProduct() {
    const products = getData('products');
    return products;
  }
  updateCartUser(id: string, user: UserEntities) {
    const responseUpdateCart = patchData('users', id, user);
    return responseUpdateCart;
  }
  updateProductsDB(id: string, product: ProductEntities) {
    const responseUpdateProductDB = patchData('products', id, product);
    return responseUpdateProductDB;
  }
}
