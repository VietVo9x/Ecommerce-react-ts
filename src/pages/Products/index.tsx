import * as React from 'react';
import PageHero from '../../components/PageHero';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import './style.scss';
export default function Products() {
  const [page, setPage] = React.useState(1);
  const handleChangeStack = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const [age, setAge] = React.useState('');
  const [value, setValue] = React.useState('');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <div>
      <PageHero title="Products" />
      <div className="products">
        <div className="products--side-bar">
          <FormGroup>
            <Box pb={5}>
              <TextField id="outlined-basic" label="Search" variant="outlined" />
            </Box>
            <Typography component={'h3'} variant="h5" pb={1} color={'primary'}>
              {' '}
              Category
            </Typography>
            <RadioGroup
              aria-labelledby="demo-error-radios"
              name="quiz"
              value={value}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="1" control={<Radio />} label="All" />
              <FormControlLabel value="2" control={<Radio />} label="PC Gaming" />
              <FormControlLabel value="3" control={<Radio />} label="Laptop" />
              <FormControlLabel value="4" control={<Radio />} label="Accessories" />
              <FormControlLabel value="5" control={<Radio />} label="Gaming Gear" />
            </RadioGroup>
          </FormGroup>
        </div>
        <div>
          <Box sx={{ width: '300px', marginLeft: 'auto' }} pb={5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort By...</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Sort By..."
                onChange={handleChangeSelect}
              >
                <MenuItem value={1}>Name (A - Z)</MenuItem>
                <MenuItem value={2}>Name (Z - A)</MenuItem>
                <MenuItem value={3}>Price(Lowest)</MenuItem>
                <MenuItem value={4}>Thirty(Highest)</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div className="products--content">
            <div className="products--content__item">
              <div className="products--content__item--image">
                <img
                  src="https://mega.com.vn/media/product/250_21883_may_bo_hp_205_pro_g4_aio_31y21pa_den_5.jpg"
                  alt=""
                />
              </div>
              <h5 className="products--content__item--title">Màn Hình Máy Tính</h5>
              <div className="products--content__item--price">
                <p>100.00$</p>
                <sub>120.00$</sub>
              </div>
              <div className="products--content__item--action">
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
            <div className="products--content__item">
              <div className="products--content__item--image">
                <img
                  src="https://mega.com.vn/media/product/250_22524_loa_bluetooth_jbl_flip_6_blk.jpg"
                  alt=""
                />
              </div>
              <h5 className="products--content__item--title">Loa Mini</h5>
              <div className="products--content__item--price">
                <p>150.00$</p>
                <sub>180.00$</sub>
              </div>
              <div className="products--content__item--action">
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
            <div className="products--content__item">
              <div className="products--content__item--image">
                <img
                  src="https://mega.com.vn/media/product/250_24398_tan_nhiet_khi_cooler_master_hyper_620s_argb.jpg"
                  alt=""
                />
              </div>
              <h5 className="products--content__item--title">Quạt tản nhiệt</h5>
              <div className="products--content__item--price">
                <p>50.00$</p>
                <sub>57.00$</sub>
              </div>
              <div className="products--content__item--action">
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
          
          {/* phan trang */}
          <Stack spacing={2} mt={2}>
            <Typography>Page: {page}</Typography>
            <Pagination count={10} page={page} onChange={handleChangeStack} />
          </Stack>
        </div>
      </div>
    </div>
  );
}
