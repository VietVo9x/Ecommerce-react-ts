import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import About from './pages/About';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ErrorPage from './pages/ErrorPage';
import SingleProduct from './pages/SingleProduct';
import { Auth } from './utils/Auth';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from './redux/slice/AuthSlice';
import { Res_Err_User_Login } from './types/error.res';

function App() {
  const dispatch = useDispatch();
  Auth()
    .then((res) => {
      if (res) {
        console.log(res);
        dispatch(loginSuccess(res.data));
      }
    })
    .catch((error) => {
      dispatch(logout());
    });
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
