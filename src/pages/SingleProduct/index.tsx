import * as React from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Link, useNavigate, useParams } from 'react-router-dom';

import './style.scss';
import { useSelector } from 'react-redux';
import { I_product, I_productUser } from '../../types/ProductsType';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { SingleProductRepository } from './SingleProductRepository';
import { I_userLoginRedux } from '../../redux/slice/AuthSlice';
import { UserEntities } from '../../Entities';
import { SingleProductServices } from './SingleProductServices';
import { RootState } from '../../redux/store/configureStore';

export default function SingleProduct() {
  const [value, setValue] = React.useState<number | null>(2);
  const [quantityInput, setQuantityInput] = useState(1);
  const user = useSelector((state: RootState) => state.auth);
  console.log(user);
  const products = useSelector((state: { products: { data: I_product[] } }) => state.products.data); //products trong redux
  const param = useParams();
  const navigate = useNavigate();
  const product = products.find((product: I_product) => product.id === param.id); //check product voi id tren url
  const singleProductServices = new SingleProductServices();
  if (!product) {
    navigate('*');
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
    if (!user.isLogin) {
      toast.error('You need to be logged in to make a purchase.', { autoClose: 1000 });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
    singleProductServices.addProductToCart(product);
  };
  return (
    <>
      <ToastContainer />
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
              <img src={product?.image} alt="main image" />
              <img src="https://www.course-api.com/images/store/extra-product-1.jpeg" alt="" />
              <img src="https://www.course-api.com/images/store/extra-product-2.jpeg" alt="" />
              <img src="https://www.course-api.com/images/store/extra-product-3.jpeg" alt="" />
              <img src="https://www.course-api.com/images/store/extra-product-4.jpeg" alt="" />
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
              ${product?.unit_price}
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
              <input type="text" value={quantityInput} />
              <button onClick={() => handleQuantity('up')}>+</button>
            </div>
            <button onClick={handleAddToCart}> ADD TO CART</button>
          </div>
        </div>
      </section>
    </>
  );
}
