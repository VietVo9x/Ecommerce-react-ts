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
import { Link } from 'react-router-dom';

export default function FeaturedProducts() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
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
              <Tab label="New Product" value="1" />
              <Tab label="Best Deal" value="2" />
              <Tab label="Best Selling" value="3" />
            </Tabs>
          </Box>
          <TabPanel value="1">
            <div className="featured-product">
              <div className="featured-product__item">
                <div className="featured-product__item--image">
                  <img
                    src="https://mega.com.vn/media/product/250_19968_tai_nghe_khong_day_logitech_g733_lightspeed_rgb_mau_den.jpg"
                    alt="tai nghe"
                  />
                </div>
                <h3 className="featured-product__item--title">San pham 1</h3>
                <div className="featured-product__item--price">
                  <p>300.00$</p> <sub>350.00$</sub>
                </div>
                <div className="featured-product__item--action">
                  <Tooltip title=" View" placement="top">
                    <Button color="inherit">
                      {' '}
                      <RemoveRedEyeOutlinedIcon />
                    </Button>
                  </Tooltip>

                  <Tooltip title=" Add to cart" placement="top">
                    <Button color="inherit">
                      {' '}
                      <ShoppingCartOutlinedIcon />
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <div className="featured-product__item">
                <div className="featured-product__item--image">
                  <img
                    src="https://mega.com.vn/media/product/250_19968_tai_nghe_khong_day_logitech_g733_lightspeed_rgb_mau_den.jpg"
                    alt="tai nghe"
                  />
                </div>
                <h3 className="featured-product__item--title">San pham 1</h3>
                <div className="featured-product__item--price">
                  <p>300.00$</p> <sub>350.00$</sub>
                </div>
                <div className="featured-product__item--action">
                  <Tooltip title=" View" placement="top">
                    <Button color="inherit">
                      {' '}
                      <RemoveRedEyeOutlinedIcon />
                    </Button>
                  </Tooltip>

                  <Tooltip title=" Add to cart" placement="top">
                    <Button color="inherit">
                      {' '}
                      <ShoppingCartOutlinedIcon />
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <div className="featured-product__item">
                <div className="featured-product__item--image">
                  <img
                    src="https://mega.com.vn/media/product/250_19968_tai_nghe_khong_day_logitech_g733_lightspeed_rgb_mau_den.jpg"
                    alt="tai nghe"
                  />
                </div>
                <h3 className="featured-product__item--title">San pham 1</h3>
                <div className="featured-product__item--price">
                  <p>300.00$</p> <sub>350.00$</sub>
                </div>
                <div className="featured-product__item--action">
                  <Tooltip title=" View" placement="top">
                    <Button color="inherit">
                      {' '}
                      <RemoveRedEyeOutlinedIcon />
                    </Button>
                  </Tooltip>

                  <Tooltip title=" Add to cart" placement="top">
                    <Button color="inherit">
                      {' '}
                      <ShoppingCartOutlinedIcon />
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <div className="featured-product__item">
                <div className="featured-product__item--image">
                  <img
                    src="https://mega.com.vn/media/product/250_19968_tai_nghe_khong_day_logitech_g733_lightspeed_rgb_mau_den.jpg"
                    alt="tai nghe"
                  />
                </div>
                <h3 className="featured-product__item--title">San pham 1</h3>
                <div className="featured-product__item--price">
                  <p>300.00$</p> <sub>350.00$</sub>
                </div>
                <div className="featured-product__item--action">
                  <Tooltip title=" View" placement="top">
                    <Button color="inherit">
                      {' '}
                      <RemoveRedEyeOutlinedIcon />
                    </Button>
                  </Tooltip>

                  <Tooltip title=" Add to cart" placement="top">
                    <Button color="inherit">
                      {' '}
                      <ShoppingCartOutlinedIcon />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>

      <Link to="/products" className="btn">
        All Product
      </Link>
    </section>
  );
}
