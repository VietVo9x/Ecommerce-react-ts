import { Res_Cart } from '../types/response.type';

export const perPage = 6;

export const calculateTotalQuantity = (cartData: Res_Cart[]): number => {
  return cartData.reduce((total: number, cartItem: Res_Cart) => {
    return total + cartItem.quantity;
  }, 0);
};
export const formatNumberToLocaleString = (
  number: number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  locale = 'en-US',
) => {
  return number.toLocaleString(locale, { minimumFractionDigits, maximumFractionDigits });
};
export const totalPriceCart = (cart: Res_Cart[]) => {
  let totalPrice = 0;
  // eslint-disable-next-line array-callback-return
  cart.map((item) => {
    totalPrice += item.quantity * item.product.price;
  });
  return totalPrice;
};
