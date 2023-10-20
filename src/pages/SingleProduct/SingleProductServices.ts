import { UserEntities } from '../../Entities';
import { I_product, I_productUser } from '../../types/ProductsType';
import { SingleProductRepository } from './SingleProductRepository';

const userLocal = localStorage.getItem('userLogin');
const singleProductRepository = new SingleProductRepository();
export class SingleProductServices {
  async addProductToCart(product: I_product) {
    const newProduct = {
      sku: product.sku,
      category_name: product.category_name,
      product_name: product.product_name,
      description: product.description,
      unit_price: product.unit_price,
      id: product.id,
      image: product.image,
      created_at: product.created_at,
      updated_at: product.updated_at,
      quantity: 1,
      new: false,
      bestDeal: false,
      bestSelling: false,
    };
    if (userLocal) {
      const userLogin = JSON.parse(userLocal);
      const users = await singleProductRepository.getAllUsers();
      const userDB = users.find((user: UserEntities) => user.id === userLogin.id);
      const productCart = userDB.cart.find(
        (productCart: I_productUser) => productCart.product_name === product.product_name,
      );
      if (productCart) {
        console.log('tang quantity');
      } else {
        userDB.cart.push(newProduct);
        const updateUserCart = await singleProductRepository.updateCartUser(userDB, userDB.id);
        console.log(updateUserCart);
      }
    }
  }
}
