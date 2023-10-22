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

import './style.scss';
import { useEffect, useRef, useState } from 'react';
import { I_product } from '../../types/ProductsType';
import { getDataFilter } from '../../utils/DB';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { perPage } from '../../utils/constant';
import { category } from '../../models';
export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const [products, setProducts] = useState<I_product[]>([]); // products da ta
  const [sortValue, setSortValue] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const page = Number(searchParams.get('page')) || 1;
  const cate = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  console.log(sortValue, sortOrder);
  const params: any = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  console.log(params); // { page: 5, pageSize: 25 }

  //mui
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ ...params, page: value.toString() });
  };
  const handleSearch = () => {
    console.log('searchValue');
    setSearchParams({ ...params, search: searchValue });
  };

  const [age, setAge] = React.useState('');

  //data products
  useEffect(() => {
    getDataFilter(
      `products?_page=${page}&_limit=6&product_name_like=${search}&category_name_like=${cate}&_sort=${sortValue}&_order=${sortOrder}`,
    ).then((res) => {
      setProducts(res?.data);
      setCount(Math.ceil(res?.headers['x-total-count'] / perPage));
    });
  }, [page, search, cate, sortValue, sortOrder]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setValue((event.target as HTMLInputElement).value);
    setSearchParams({ ...params, category: event.target.value });
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setAge(event.target.value);
    console.log(event.target.value as string);
    switch (event.target.value.toString()) {
      case '1':
        setSortValue('product_name');
        setSortOrder('asc');
        break;

      case '2':
        setSortValue('product_name');
        setSortOrder('desc');
        break;

      case '3':
        setSortValue('unit_price');
        setSortOrder('desc');
        break;
      case '4':
        setSortValue('unit_price');
        setSortOrder('asc');
        break;
    }
  };

  //filter

  //handle view
  const navigate = useNavigate();
  const handleView = (id: string) => {
    navigate('/products/' + id);
  };
  return (
    <div>
      <PageHero title="Products" />
      <div className="products">
        <div className="products--side-bar">
          <FormGroup>
            <Box pb={5}>
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={searchValue}
                onChange={(e: any) => setSearchValue(e.target.value)}
              />
              <Button onClick={handleSearch}>Search</Button>
            </Box>
            <Typography component={'h3'} variant="h5" pb={1} color={'primary'}>
              {' '}
              Category
            </Typography>
            <RadioGroup
              aria-labelledby="demo-error-radios"
              name="quiz"
              value={cate}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="" control={<Radio />} label="All" />
              <FormControlLabel value="PC" control={<Radio />} label="PC " />
              <FormControlLabel value="Laptop" control={<Radio />} label="Laptop" />
              <FormControlLabel value="Accessories" control={<Radio />} label="Accessories" />
              <FormControlLabel value="Gaming Gear" control={<Radio />} label="Gaming Gear" />
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
            {products &&
              products.map((product) => (
                <div className="products--content__item" key={product.id}>
                  <div className="products--content__item--image">
                    <img src={product.image} alt="" />
                  </div>
                  <h5 className="products--content__item--title">{product.product_name}</h5>
                  <div className="products--content__item--price">
                    <p>{product.unit_price}.00 $</p>
                  </div>
                  <div className="products--content__item--action">
                    <Tooltip title=" View" placement="top">
                      <Button color="inherit" onClick={() => handleView(product.id)}>
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
              ))}
          </div>
          {/* phan trang */}
          <Stack spacing={2} mt={2}>
            <Pagination count={count} page={page || 1} onChange={handleChange} />
          </Stack>
        </div>
      </div>
    </div>
  );
}
