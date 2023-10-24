import { I_product, I_productUser } from '../../types/ProductsType';
import { SingleProductRepository } from './SingleProductRepository';
import { UserEntities } from '../../Entities';

const userLocal = localStorage.getItem('userLogin');
const singleProductRepository = new SingleProductRepository();
export class SingleProductServices {
  async addProductToCart(product: I_product, qtyInput: number) {
    //tao moi 1 product trong cart
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
      quantity: qtyInput,
      new: product.new,
      bestDeal: product.bestDeal,
      bestSelling: product.bestSelling,
    };
    if (userLocal) {
      const userLogin = JSON.parse(userLocal);
      const users = await singleProductRepository.getAllUsers();
      const userDB = users.find((user: UserEntities) => user.id === userLogin.id);
      const productCart = userDB.cart.find(
        (productCart: I_productUser) => productCart.product_name === product.product_name,
      );
      if (productCart) {
        productCart.quantity = productCart.quantity + qtyInput;
        console.log(productCart);
        const updateUserCart = await singleProductRepository.updateCartUser(userDB.id, userDB);

        return updateUserCart;
      } else {
        //neu chua co san pham do trong cart
        console.log(productCart);
        userDB.cart.push(newProduct);
        const updateUserCart = await singleProductRepository.updateCartUser(userDB.id, userDB);
        return updateUserCart;
      }
    }
  }
}
