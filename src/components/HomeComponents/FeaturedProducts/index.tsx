import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Tabs, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Res_Product } from '../../../types/response.type';
import { getData } from '../../../utils/api.services';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Res_Product[]>([]);
  const sortValue = 'created_at';
  const sortOrder = 'DESC';

  const [value, setValue] = React.useState('new');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  //handle view
  const navigate = useNavigate();
  const handleView = (id: number) => {
    navigate('/products/' + id);
  };
  useEffect(() => {
    // getData(`/product?limit=8&sort=${sortValue}&order=${sortOrder}`)
    //   .then((res) => {
    //     if (res) setProducts(res.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <section className="featured-product--wrapper">
      <Typography variant="h3" component={'h5'} align="center" p={5}>
        Featured Products
      </Typography>

      <Box sx={{ width: '1200px', maxWidth: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              onChange={handleChange}
              value={value}
              centered={true}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab label="New Product" value="new" />
            </Tabs>
          </Box>
          <TabPanel value="new">
            <div className="featured-product">
              {products.map((element, index) => (
                <div className="featured-product__item" key={index}>
                  <div className="featured-product__item--image">
                    <img src={element.imageProducts[0].image_url} alt={element.product_name} />
                  </div>
                  <h5 className="featured-product__item--title">{element.product_name}</h5>

                  <div className="featured-product__item--actions">
                    <div className="featured-product__item--price">
                      <p>$ {element.price}.00</p>
                    </div>

                    <Tooltip title="Add to cart" placement="top">
                      <Button onClick={() => handleView(element.id)}>
                        {' '}
                        <ShoppingCartOutlinedIcon />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        </TabContext>
      </Box>

      <Link to="/products" className="btn">
        All Product
      </Link>
    </section>
  );
}
