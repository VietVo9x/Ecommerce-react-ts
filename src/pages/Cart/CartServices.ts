import { UserEntities } from '../../Entities';
import { I_productUser } from '../../types/ProductsType';
import { CartRepository } from './CartRepository';
const cartRepository = new CartRepository();
export class CartServices {
  updateProductUser({
    id,
    user,
    condition,
  }: {
    id: string;
    user: UserEntities;
    condition: string;
  }) {
    const cartUpdate = user.cart;
    const index = cartUpdate.findIndex((product: I_productUser) => product.id == id);

    if (index !== -1) {
      // Create a new object with the updated quantity
      let updatedCartItem;
      if (condition == 'up') {
        updatedCartItem = { ...cartUpdate[index], quantity: cartUpdate[index].quantity + 1 };
      } else {
        updatedCartItem = { ...cartUpdate[index], quantity: cartUpdate[index].quantity - 1 };
      }

      // Create a new cart array with the updated item
      const cartClone = [...cartUpdate];
      cartClone[index] = updatedCartItem;

      const userUpdate = { ...user, cart: cartClone };

      // You can return or update the user with the new cart data here
      return cartRepository.UpdateUser(user.id, userUpdate);
    }
  }
  deleteProduct({ id, user }: { id: string; user: UserEntities }) {
    const cartUpdate = user.cart;
    const index = cartUpdate.findIndex((product: I_productUser) => product.id == id);
    console.log(index);
    // Create a new object with the updated quantity

    const cartClone: I_productUser[] = [...cartUpdate];
    let updatedCartItem = cartClone.splice(index, 1);
    console.log(updatedCartItem);
    const userUpdate = { ...user, cart: cartClone };

    return cartRepository.UpdateUser(user.id, userUpdate);
  }
  async deleteCart(id: string, data: UserEntities) {
    const newUser = { ...data };
    newUser.cart = [];
    const response = await cartRepository.UpdateUser(id, newUser);
    return response;
  }
}
