import * as React from 'react';
import PageHero from '../../components/PageHero';
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
import { useEffect, useState } from 'react';
import { getData } from '../../utils/DB';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { _CATEGORY, _PRODUCT } from '../../utils/constantAPI';
import { Res_Category, Res_Product } from '../../types/response.type';
import { formatNumberToLocaleString, perPage } from '../../utils/constant';
export default function Products() {
  const [categorys, setCategorys] = useState<Res_Category[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const [products, setProducts] = useState<Res_Product[]>([]);
  const [sortValue, setSortValue] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const page = Number(searchParams.get('page')) || 1;
  const cate = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const params: any = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  //mui
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ ...params, page: value.toString() });
    setCount(() => Math.ceil(products.length / perPage));
  };

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchValue(e?.target.value);
    setTimeout(() => {
      setSearchParams({ ...params, search: e?.target.value, page: '1' });
      setCount(() => Math.ceil(products.length / perPage));
    }, 2000);
  };
  const clearSearch = () => {
    setSearchParams({ ...params, search: '' });
    setSearchValue('');
  };
  const [age, setAge] = React.useState('');

  //lay data category
  useEffect(() => {
    getData(_CATEGORY).then((res) => {
      setCategorys(res?.data);
    });
  }, []);
  //data products
  useEffect(() => {
    getData(
      `/product?page=${page}&limit=${perPage}&name=${search}&category=${cate}&sort=${sortValue}&order=${sortOrder}`,
    ).then((res) => {
      setCount(Math.ceil(Number(res?.headers['x-total-products']) / perPage));
      setProducts([...res?.data]);
    });
  }, [page, search, cate, sortValue, sortOrder]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setValue((event.target as HTMLInputElement).value);
    setSearchParams({ ...params, category: event.target.value, page: 1 });
    setCount(Math.ceil(products.length / perPage));
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setSearchParams({ ...params, page: '1' });
    setAge(event.target.value);
    setCount(Math.ceil(products.length / perPage));

    switch (event.target.value.toString()) {
      case '1':
        setSortValue('product_name');
        setSortOrder('ASC');
        break;

      case '2':
        setSortValue('product_name');
        setSortOrder('DESC');
        break;

      case '3':
        setSortValue('price');
        setSortOrder('ASC');

        break;
      case '4':
        setSortValue('price');
        setSortOrder('DESC');
        break;
    }
  };

  //filter

  //handle view
  const navigate = useNavigate();
  const handleView = (id: number) => {
    navigate('/products/' + id);
  };
  return (
    <div>
      <PageHero title="Products" />
      <div className="products">
        <div className="products--side-bar">
          <FormGroup>
            <Box pb={5} display={'flex'}>
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={searchValue}
                onChange={(e) => {
                  handleSearch(e);
                }}
              />
              <Button onClick={clearSearch} variant="contained">
                Clear
              </Button>
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

              {categorys &&
                categorys.map((element, index) => (
                  <FormControlLabel
                    value={element.id}
                    control={<Radio />}
                    label={element.category_name}
                    key={index}
                  />
                ))}
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
                    {product.imageProducts.map((image, index) => (
                      <img src={image.image_url} alt={image.image_url} key={index} />
                    ))}
                  </div>
                  <h5 className="products--content__item--title">{product.product_name}</h5>

                  <div className="products--content__item--action">
                    <div className="products--content__item--price">
                      <p>$ {formatNumberToLocaleString(product.price)}</p>
                    </div>

                    <Tooltip
                      title=" Add to cart"
                      placement="top"
                      onClick={() => handleView(product.id)}
                    >
                      <Button>
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
