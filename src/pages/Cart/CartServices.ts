import { CartRepository } from './CartRepository';
const cartRepository = new CartRepository();
export class CartServices {
  updateProductUser({ id, qty, user, condition }: any) {
    const cartUpdate = user.cart;
    const index = cartUpdate.findIndex((cart: any) => cart.id == id);

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
  deleteProduct({ id, user }: { id: string; user: any }) {
    const cartUpdate = user.cart;
    const index = cartUpdate.findIndex((cart: any) => cart.id == id);
    console.log(index);
    // Create a new object with the updated quantity

    const cartClone = [...cartUpdate];
    let updatedCartItem = cartClone.splice(index, 1);
    console.log(updatedCartItem);
    const userUpdate = { ...user, cart: cartClone };

    return cartRepository.UpdateUser(user.id, userUpdate);
    // Create a new cart array with the updated item
    // const cartClone = [...cartUpdate];
    // cartClone[index] = updatedCartItem;

    // const userUpdate = { ...user, cart: cartClone };
    // console.log('cartUpdate', cartClone);
    // console.log('userUpdate', userUpdate);

    // // You can return or update the user with the new cart data here
    // return cartRepository.UpdateUser(user.id, userUpdate);
  }
  deleteCart() {}
}
