import * as React from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Link, useNavigate, useParams } from 'react-router-dom';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { I_product, I_productUser } from '../../types/ProductsType';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { SingleProductRepository } from './SingleProductRepository';
import { SingleProductServices } from './SingleProductServices';
import { RootState } from '../../redux/store/configureStore';
import { getProducts } from '../../redux/slice/ProductStore';
import { login } from '../../redux/slice/AuthSlice';
import Auth from '../../utils/Auth';
import PageHero from '../../components/PageHero';

export default function SingleProduct() {
  const [value, setValue] = React.useState<number | null>(2);
  const [quantityInput, setQuantityInput] = useState(1);

  const auth: {
    isLogin: boolean;
    user: any;
  } = useSelector((state: RootState) => state.auth);

  const products = useSelector((state: { products: { data: I_product[] } }) => state.products.data); //products trong redux
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = products.find((product: I_product) => product.id == param.id); //check product voi id tren url
  const singleProductServices = new SingleProductServices();
  const singleProductRepository = new SingleProductRepository();

  if (!product) {
    navigate('/products');
    return <></>;
  }

  const handleQuantity = (action: 'up' | 'down') => {
    if (action === 'up') {
      setQuantityInput((x) => x + 1);
    } else {
      setQuantityInput((x) => x - 1);
    }
  };
  const handleAddToCart = async () => {
    if (!auth.isLogin) {
      toast.error('You need to be logged in to make a purchase.', { autoClose: 1000 });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }
    const response = await singleProductServices.addProductToCart(product, quantityInput);
    if (response) {
      singleProductRepository.getAllProduct().then((res) => {
        dispatch(getProducts(res));
      });
      toast.success(`Successfully added ${quantityInput} items.`, { autoClose: 1000 });
      Auth().then((res) => {
        if (res) {
          dispatch(login(res));
        }
      });
    }
  };
  return (
    <>
      <ToastContainer />
      <PageHero title={`Products / ${product.product_name}`} />
      <section className="container">
        <div className="btn--back">
          <Link to="/products">BACK TO PRODUCTS</Link>
        </div>
        <div className="product">
          <div className="product__images">
            <div className="product__images--main">
              <img src={product?.image} alt="anh chinh" />
            </div>
            <div className="product__images--sub">
              <img src={product.image} alt={product.product_name} />
              <img
                src="https://product.hstatic.net/200000722513/product/i-dong-thonet-vander-duett-silver-666_74c833966b19439c863455d4bad4f09f_1872f4f94dbb494284eebf0d1eec654c_medium.jpg"
                alt=""
              />
              <img
                src="https://product.hstatic.net/200000722513/product/thumbchuot_d3fc60cd30fb4f98a8c944652687d073_4de309651e164446a1bffe4ce45a1438_medium.png"
                alt=""
              />
              <img
                src="https://product.hstatic.net/200000722513/product/gearvn-tai-nghe-dareu-eh416-rgb-1_50b1586d8678429aaee7922ec536c3f3_418f44656d36414e8b56e8c62927e5c7_medium.png"
                alt=""
              />
              <img
                src="https://product.hstatic.net/200000722513/product/1_df57f2bc10d745a29d751c4541326890_9cf75b8940a949ccaab795bb8bf1d949_medium.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="product__content">
            <Typography component={'h2'} variant="h2">
              {product?.product_name}
            </Typography>
            <div className="product__content--rating">
              <span>
                <Rating name="read-only" value={value} readOnly />
              </span>
              <span>(100 customer reviews)</span>
            </div>
            <Typography component={'h5'} variant="h4" pt={2}>
              $ {product?.unit_price}.00
            </Typography>
            <p className="product__content--desc"> {product?.description}</p>
            <p className="product__content--info">
              <span>Available :</span>
              {Number(product?.stock_quantity) > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
            </p>
            <p className="product__content--info">
              <span>SKU : </span>
              {product?.sku}
            </p>
            <p className="product__content--info">
              <span>Brand :</span>
              {product?.category_name}
            </p>
            <div className="product__content--action">
              <button onClick={() => handleQuantity('down')} disabled={quantityInput === 1}>
                -
              </button>
              {quantityInput && <input type="text" value={quantityInput} readOnly />}
              <button onClick={() => handleQuantity('up')}>+</button>
            </div>
            <button onClick={handleAddToCart} disabled={product.stock_quantity === 0}>
              ADD TO CART
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
