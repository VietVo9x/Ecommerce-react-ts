import { Button } from '@mui/material';
import PageHero from '../../components/PageHero';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { CartServices } from './CartServices';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Res_Cart } from '../../types/response.type';
// import { login } from '../../redux/slice/AuthSlice';
export default function Cart() {
  const [cart, setCart] = useState<Res_Cart[]>([]);
  const cartServices = new CartServices();
  const navigate = useNavigate();
  //tang giam so luong
  const handleUpdateQty = async (condition: 'up' | 'down', id: number, qty: number) => {
    const cartUpdate = {
      id: id,
      quantity: qty,
    };
    if (condition === 'up') {
      cartUpdate.quantity = qty + 1;
      cartServices
        .updateProductCart(id, cartUpdate)
        .then((res) => {
          if (res) {
            const updatedCart = cart.map((item) =>
              item.id === id ? { ...item, quantity: res.data.quantity } : item,
            );
            setCart(updatedCart);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (condition === 'down') {
      cartUpdate.quantity = qty - 1;
      cartServices
        .updateProductCart(id, cartUpdate)
        .then((res) => {
          if (res) {
            const updatedCart = cart.map((item) =>
              item.id === id ? { ...item, quantity: res.data.quantity } : item,
            );
            setCart(updatedCart);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // xoa 1 product
  const handleDelete = async (id: number) => {
    cartServices.deleteProductCart(id).then((res) => {
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
    });
  };
  //clear cart
  const handleClearCart = async () => {
    cartServices.clearCart().then((res) => {
      setCart([]);
    });
  };
  const totalPriceCart = (cart: Res_Cart[]) => {
    let totalPrice = 0;
    // eslint-disable-next-line array-callback-return
    cart.map((item) => {
      totalPrice += item.quantity * item.product.price;
    });
    return totalPrice;
  };

  useEffect(() => {
    cartServices
      .getCart()
      .then((res) => {
        setCart(res?.data);
      })
      .catch((error) => {
        navigate('/login');
      });
  }, []);
  return (
    <div>
      <PageHero title="Cart" />

      {cart && cart.length > 0 ? (
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
                cart.map((item: Res_Cart, index: number) => (
                  <tr key={index}>
                    <td>
                      <img src={item.product.imageProducts[0].image_url} alt="" />
                    </td>
                    <td>{item.product.product_name}</td>
                    <td>$ {item.product.price}.00</td>
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
                    <td>$ {item.quantity * item.product.price}.00</td>
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
              <Link to={'/products'}>Continue Shopping</Link>
            </Button>
            <Button variant="contained" color="warning" onClick={handleClearCart}>
              Clear Shopping Cart
            </Button>
          </div>
          <div className="cart__checkout">
            {/* <h5
              className="
          cart__checkout--item"
            >
              Subtotal : <span>$ 100.00</span>
            </h5>
            <p
              className="
          cart__checkout--item"
            >
              Shipping Fee : <span>$ 5.34</span>
            </p> */}
            <h4
              className="
          cart__checkout--item"
            >
              Order Total : <span>$ {totalPriceCart(cart)}.00</span>
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
