import { Res_Cart } from '../types/response.type';
import { getData } from './DB';
import { calculateTotalQuantity } from './constant';
import { _CART, _VERIFY_TOKEN } from './constantAPI';

const Auth = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const user = await getData(_VERIFY_TOKEN);
      return user;
    }
  } catch (error) {
    throw error;
  }
};
const getCartQuantity = async () => {
  try {
    const cartResponse = await getData(_CART);
    if (cartResponse) {
      const carData: Res_Cart[] = cartResponse.data;
      const totalQuantityCart = calculateTotalQuantity(carData);
      return totalQuantityCart;
    }
  } catch (error) {
    throw error;
  }
};
export { Auth, getCartQuantity };
