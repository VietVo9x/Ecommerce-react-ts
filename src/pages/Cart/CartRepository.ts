import { ProductEntities, UserEntities } from '../../Entities';
import { getData, patchData } from '../../utils/DB';

export class CartRepository {
  async getAllUsers() {
    const users = await getData('users');
    return users;
  }
  async UpdateUser(id: string, data: UserEntities) {
    const response = await patchData('users', id, data);
    return response;
  }
  async getAllProducts() {
    const products = await getData('products');
    return products;
  }
  async UpdateProductDB(id: string, data: ProductEntities) {
    const response = await patchData('products', id, data);
    return response;
  }
}
