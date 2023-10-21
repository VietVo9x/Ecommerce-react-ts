import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import PageHero from '../../components/PageHero';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/configureStore';
import { I_productUser } from '../../types/ProductsType';
import { CartRepository } from './CartRepository';
import { CartServices } from './CartServices';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Auth from '../../utils/Auth';
import { login } from '../../redux/slice/AuthSlice';
export default function Cart() {
  const cartRepository = new CartRepository();
  const cartServices = new CartServices();
  const auth: {
    isLogin: boolean;
    user: any;
  } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  let totalPriceOrder = 0;
  if (auth.user !== undefined) {
    auth.user.cart.forEach(function (product: I_productUser) {
      totalPriceOrder += product.quantity * Number(product.unit_price);
    });
  }
  const handleUpdateQty = async (condition: 'up' | 'down', id: string, qty: number) => {
    const response = await cartServices.updateProductUser({ id, qty, user: auth?.user, condition });
    if (response.id) {
      Auth().then((res) => {
        if (res) {
          dispatch(login(res));
        }
      });
    }
  };
  const handleDelete = async (id: string) => {
    const conf = window.confirm('Are you sure you want to delete');
    if (!conf) return;
    const response = await cartServices.deleteProduct({ id, user: auth?.user });
    if (response.id) {
      Auth().then((res) => {
        if (res) {
          dispatch(login(res));
        }
      });
    }
  };
  return (
    <div>
      <PageHero title="Cart" />

      {auth.user !== undefined && auth.user.cart.length > 0 ? (
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
              {auth.user.cart.map((item: I_productUser, index: number) => (
                <tr key={index}>
                  <td>
                    <img src={item.image} alt="" />
                  </td>
                  <td>{item.product_name}</td>
                  <td>{item.unit_price} $</td>
                  <td className="cart__table--value">
                    <Button
                      variant="text"
                      onClick={() => handleUpdateQty('down', item.id, item.quantity)}
                      disabled={item.quantity === 1}
                    >
                      <span>-</span>
                    </Button>
                    <h2>{item.quantity}</h2>
                    <Button
                      variant="text"
                      onClick={() => handleUpdateQty('up', item.id, item.quantity)}
                    >
                      <span>+</span>
                    </Button>
                  </td>
                  <td>{item.quantity * Number(item.unit_price)}.00 $</td>
                  <td>
                    <Button variant="text" color="error" onClick={() => handleDelete(item.id)}>
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart__btns">
            <Button variant="contained" color="secondary">
              Continue Shopping
            </Button>
            <Button variant="contained" color="warning">
              Clear Shopping Cart
            </Button>
          </div>
          <div className="cart__checkout">
            <h5
              className="
          cart__checkout--item"
            >
              Subtotal : <span>$ {Math.floor(totalPriceOrder)}.00</span>
            </h5>
            <p
              className="
          cart__checkout--item"
            >
              Shipping Fee : <span>$ 5.34</span>
            </p>
            <h4
              className="
          cart__checkout--item"
            >
              Order Total : <span>$ {Math.floor(totalPriceOrder - 5.34)}.00</span>
            </h4>
            <div className="cart__checkout--btn">
              <Button variant="contained" color="success" fullWidth>
                <Link to="/checkout">checkout</Link>
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="cart--empty">
          <h1>Your cart is empty</h1>
          <Button variant="contained" color="secondary">
            <Link to="/products">Back products page</Link>
          </Button>
        </section>
      )}
    </div>
  );
}
