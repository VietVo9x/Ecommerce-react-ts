import { Button } from '@mui/material';
import PageHero from '../../components/PageHero';
import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/configureStore';
import { useState } from 'react';
import { I_productUser } from '../../types/ProductsType';
import { CartRepository } from './CartRepository';
import { CartServices } from './CartServices';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserReduxEntity } from '../../types/login.response';
export default function Cart() {
  const cartRepository = new CartRepository();
  const cartServices = new CartServices();
  const auth: {
    isLogin: boolean;
    user: any;
  } = useSelector((state: RootState) => state.auth);
  const cart: I_productUser[] = auth.user.cart;

  return (
    <div>
      <PageHero title="Cart" />
      <section className="cart">
        <table className="cart__table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              cart.map((item: I_productUser, index: number) => (
                <tr key={index}>
                  <td>
                    <img src={item.image} alt="" />
                  </td>
                  <td>{item.product_name}</td>
                  <td>{item.unit_price} $</td>
                  <td>{item.quantity}</td>
                  <td>{item.quantity * Number(item.unit_price)}$</td>
                  <td>
                    <Button variant="text" color="error">
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="cart__btns">
          <Button variant="contained">Continue Shopping</Button>
          <Button variant="contained" color="secondary">
            Clear Shopping Cart
          </Button>
        </div>
        <div className="cart__checkout">
          <h5>
            Subtotal : <span> $687.87</span>
          </h5>
          <p>
            Shipping Fee : <span>$5.34</span>
          </p>
          <h4>
            Order Total : <span>$693.21</span>
          </h4>
          <div className="cart__checkout--btn">
            <Button variant="contained" fullWidth>
              checkout
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
