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
import { useSelector } from 'react-redux';
// import { RootState } from '../../../redux/store/configureStore';
import { useEffect, useState } from 'react';

export default function FeaturedProducts() {
  const products = useSelector((state: any) => state.products.data);
  const [listData, setListData] = useState<any[]>([]);

  const [value, setValue] = React.useState('new');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  //handle view
  const navigate = useNavigate();
  const handleView = (id: string) => {
    navigate('/products/' + id);
  };
  useEffect(() => {
    if (products && (value == 'new' || value == 'bestSelling' || value == 'bestDeal')) {
      const newData = products.filter((product: any) => product[value]);
      setListData(newData);
    }
  }, [value]);

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
              <Tab label="Best Deal" value="bestDeal" />
              <Tab label="Best Selling" value="bestSelling" />
            </Tabs>
          </Box>
          <TabPanel value="new">
            <div className="featured-product">
              {listData.map((element, index) => (
                <div className="featured-product__item" key={index}>
                  <div className="featured-product__item--image">
                    <img src={element.image} alt={element.product_name} />
                  </div>
                  <h5 className="featured-product__item--title">{element.product_name}</h5>

                  <div className="featured-product__item--actions">
                    <div className="featured-product__item--price">
                      <p>$ {element.unit_price}.00</p>
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
          <TabPanel value="bestDeal">
            <div className="featured-product">
              {listData.map((element, index) => (
                <div className="featured-product__item" key={index}>
                  <div className="featured-product__item--image">
                    <img src={element.image} alt={element.product_name} />
                  </div>
                  <h5 className="featured-product__item--title">{element.product_name}</h5>

                  <div className="featured-product__item--actions">
                    <div className="featured-product__item--price">
                      <p>$ {element.unit_price}.00</p>
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
          <TabPanel value="bestSelling">
            <div className="featured-product">
              {listData.map((element, index) => (
                <div className="featured-product__item" key={index}>
                  <div className="featured-product__item--image">
                    <img src={element.image} alt={element.product_name} />
                  </div>
                  <h5 className="featured-product__item--title">{element.product_name}</h5>

                  <div className="featured-product__item--actions">
                    <div className="featured-product__item--price">
                      <p>$ {element.unit_price}.00</p>
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
