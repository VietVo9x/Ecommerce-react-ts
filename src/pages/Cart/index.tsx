import { Button } from '@mui/material';
import PageHero from '../../components/PageHero';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/configureStore';
import { I_productUser } from '../../types/ProductsType';
import { CartServices } from './CartServices';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import Auth from '../../utils/Auth';
import { login } from '../../redux/slice/AuthSlice';
export default function Cart() {
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
  //tang giam so luong
  const handleUpdateQty = async (condition: 'up' | 'down', id: string, qty: number) => {
    const response = await cartServices.updateProductUser({ id, user: auth?.user, condition });
    if (response.id) {
      Auth().then((res) => {
        if (res) {
          dispatch(login(res));
        }
      });
    }
  };
  // xoa 1 product
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
  //clear cart
  const handleClearCart = async () => {
    const conf = window.confirm('Are you sure you want to clear your cart');
    if (!conf) return;
    if (auth.user !== undefined) {
      const id = auth.user.id;
      const user = auth.user;
      const response = await cartServices.deleteCart(id, user);
      if (response) {
        Auth().then((res) => {
          if (res) {
            dispatch(login(res));
          }
        });
      }
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
                  <td>$ {item.unit_price}.00</td>
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
                  <td>$ {item.quantity * Number(item.unit_price)}.00</td>
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
