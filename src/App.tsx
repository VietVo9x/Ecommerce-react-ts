import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import About from './pages/About';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ErrorPage from './pages/ErrorPage';
import SingleProduct from './pages/SingleProduct';
import { Auth, getCartQuantity } from './utils/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from './redux/slice/AuthSlice';
import { setTotalCart } from './redux/slice/CartSlice';
import { useEffect } from 'react';
import { RootState } from './redux/store/configureStore';

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const res = await Auth();
        if (res) {
          dispatch(loginSuccess(res.data));
          const totalQuantityCart = await getCartQuantity();
          if (totalQuantityCart) dispatch(setTotalCart(totalQuantityCart));
        }
      } catch (error) {
        dispatch(logout());
        dispatch(setTotalCart(0));
      }
    };

    handleLogin();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={isLogin ? <Cart /> : <Login />} />
        <Route path="/checkout" element={isLogin ? <Checkout /> : <Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
