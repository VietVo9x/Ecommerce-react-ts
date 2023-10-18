import * as React from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import './style.scss';

export default function SingleProduct() {
  const [value, setValue] = React.useState<number | null>(2);
  return (
    <section className="container">
      <div className="btn--back">
        <Link to="/products">BACK TO PRODUCTS</Link>
      </div>
      <div className="product">
        <div className="product__images">
          <div className="product__images--main">
            <img src="https://www.course-api.com/images/store/product-12.jpeg" alt="anh chinh" />
          </div>
          <div className="product__images--sub">
            <img src="https://www.course-api.com/images/store/product-12.jpeg" alt="anh chinh" />
            <img src="https://www.course-api.com/images/store/extra-product-1.jpeg" alt="" />
            <img src="https://www.course-api.com/images/store/extra-product-2.jpeg" alt="" />
            <img src="https://www.course-api.com/images/store/extra-product-3.jpeg" alt="" />
            <img src="https://www.course-api.com/images/store/extra-product-4.jpeg" alt="" />
          </div>
        </div>
        <div className="product__content">
          <Typography component={'h2'} variant="h2">
            Modern Poster
          </Typography>
          <div className="product__content--rating">
            <span>
              <Rating name="read-only" value={value} readOnly />
            </span>
            <span>(100 customer reviews)</span>
          </div>
          <Typography component={'h5'} variant="h4" pt={2}>
            $30.99
          </Typography>
          <p className="product__content--desc">
            {' '}
            Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok
            pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund.
            Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry
            kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing
            gochujang live-edge
          </p>
          <p className="product__content--info">
            <span>Available :</span>In Stock
          </p>
          <p className="product__content--info">
            <span>SKU : </span>RecQ0fMd8T0Vk211E
          </p>
          <p className="product__content--info">
            <span>Brand :</span>Headphone
          </p>
          <div className="product__content--action">
            <button>-</button>
            <input type="text" value={1} />
            <button>+</button>
          </div>
          <button> ADD TO CART</button>
        </div>
      </div>
    </section>
  );
}
