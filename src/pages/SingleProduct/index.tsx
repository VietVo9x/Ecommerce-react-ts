import * as React from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import './style.scss';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { SingleProductServices } from './SingleProductServices';
// import { RootState } from '../../redux/store/configureStore';
// import { getProducts } from '../../redux/slice/ProductStore';
// import { login } from '../../redux/slice/AuthSlice';
import PageHero from '../../components/PageHero';
import { Res_Product } from '../../types/response.type';
import { logout } from '../../redux/slice/AuthSlice';
import { calculateTotalQuantity, formatNumberToLocaleString } from '../../utils/constant';
import { setTotalCart } from '../../redux/slice/CartSlice';

export default function SingleProduct() {
  const singleProductService = new SingleProductServices();
  const [value, setValue] = React.useState<number | null>(2);
  const [quantityInput, setQuantityInput] = useState(1);
  const [product, setProduct] = useState<Res_Product>();
  const [image, setImage] = useState<string>();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      singleProductService.getProduct(id).then((res) => {
        setProduct(res?.data);
        setImage(res?.data.imageProducts[0].image_url);
      });
    }
  }, []);

  const setBigImageProduct = (url: string) => {
    setImage(url);
  };
  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = e.target.value;
    const isNumber = /^[0-9\b]+$/;

    if (enteredValue !== '' || isNumber.test(enteredValue)) {
      setQuantityInput(Number(enteredValue));
    }
  };

  if (!product) {
    navigate('/*');
    return <></>;
  }

  const handleQuantity = (action: 'up' | 'down') => {
    if (action === 'up' && quantityInput < product.quantity_stock) {
      setQuantityInput((x) => x + 1);
    } else if (action === 'down') {
      setQuantityInput((x) => x - 1);
    }
  };
  const handleAddToCart = async () => {
    try {
      const productCart = {
        product_id: product.id,
        quantity: quantityInput,
      };
      const insertProductCart = await singleProductService.createCart(productCart);

      const totalQuantity = calculateTotalQuantity(insertProductCart?.data);
      dispatch(setTotalCart(totalQuantity));
      toast.success('Product added successfully', {
        autoClose: 1000,
      });
    } catch (error) {
      toast.error('Please log in to purchase', {
        autoClose: 1000,
      });
      dispatch(logout());
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
              <img src={image} alt="anh chinh" />
            </div>
            <div className="product__images--sub">
              {product &&
                product.imageProducts.map((image, index) => (
                  <img
                    key={index}
                    src={image.image_url}
                    alt={image.image_url}
                    onClick={() => {
                      setBigImageProduct(image.image_url);
                    }}
                  />
                ))}
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
              $ {formatNumberToLocaleString(product?.price)}
            </Typography>
            <p className="product__content--desc"> {product?.description}</p>
            <p className="product__content--info">
              <span>Available :</span>
              {product?.quantity_stock}
            </p>
            <p className="product__content--info">
              <span>SKU : </span>
              {product?.sku}
            </p>
            <p className="product__content--info">
              <span>Brand :</span>
              {product.category.category_name}
            </p>
            <div className="product__content--action">
              <button onClick={() => handleQuantity('down')} disabled={quantityInput === 1}>
                -
              </button>
              {quantityInput && (
                <input
                  type="number"
                  value={
                    quantityInput > product.quantity_stock ? product.quantity_stock : quantityInput
                  }
                  onChange={(e) => handleChangeQuantity(e)}
                />
              )}
              <button onClick={() => handleQuantity('up')}>+</button>
            </div>
            <button onClick={handleAddToCart} disabled={product.quantity_stock === 0}>
              ADD TO CART
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
