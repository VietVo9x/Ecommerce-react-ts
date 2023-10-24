import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserPlus, FaBars, FaWindowClose } from 'react-icons/fa';
import { links } from '../../routes';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { I_authState, logout } from '../../redux/slice/AuthSlice';
import { RootState } from '../../redux/store/configureStore';
import { I_productUser } from '../../types/ProductsType';
export default function Header() {
  const [showNavMobile, setShowNavMobile] = useState(false);
  const auth: {
    isLogin: boolean;
    user: any;
  } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Mui menu account start
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Mui menu account end

  //check so luong san pham trong cart
  let totalQuantity = 0;
  if (auth.user !== undefined) {
    console.log(auth.user.cart);
    auth.user.cart.forEach(function (product: I_productUser) {
      totalQuantity += product.quantity;
    });
  }

  const handleLogout = async () => {
    handleClose();
    localStorage.removeItem('userLogin');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <nav className="nav">
        <div className="nav__logo">
          <Link to="/">
            <i>
              Tech<span>Shop</span>
            </i>
          </Link>
          <button onClick={() => setShowNavMobile(true)}>
            <FaBars />
          </button>
        </div>

        <ul className="nav__menu--pc">
          {links.map((element) => (
            <li key={element.id}>
              <Link to={element.link}>{element.text}</Link>
            </li>
          ))}
        </ul>
        <div className={showNavMobile ? 'nav__menu--mobile show' : 'nav__menu--mobile'}>
          <button onClick={() => setShowNavMobile(false)}>
            <FaWindowClose />
          </button>
          <ul>
            {links.map((element) => (
              <li key={element.id} onClick={() => setShowNavMobile(false)}>
                <Link to={element.link}>{element.text}</Link>
              </li>
            ))}
          </ul>
          <div className="nav__menu--mobile-btns">
            <Link to="/cart" className="nav__btns--cart" onClick={() => setShowNavMobile(false)}>
              Cart
              <span className="nav__btns--cart-icon">
                <FaShoppingCart />
                <span>{totalQuantity}</span>
              </span>
            </Link>
            {auth.isLogin ? (
              <>
                <Link
                  to="/account"
                  className="nav__btns--login"
                  onClick={() => setShowNavMobile(false)}
                >
                  Account
                  <SettingsOutlinedIcon />
                </Link>
                <Link
                  to={'/login'}
                  className="nav__btns--login"
                  onClick={() => {
                    handleLogout();
                    setShowNavMobile(false);
                  }}
                >
                  Logout
                  <ExitToAppIcon />
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="nav__btns--login"
                onClick={() => setShowNavMobile(false)}
              >
                Login
                <FaUserPlus />
              </Link>
            )}
          </div>
        </div>

        <div className="nav__btns">
          <Link to="/cart" className="nav__btns--cart">
            Cart
            <span className="nav__btns--cart-icon">
              <FaShoppingCart />
              <span>{totalQuantity}</span>
            </span>
          </Link>
          {auth.isLogin ? (
            <div>
              <Button
                variant="contained"
                color="secondary"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Hello ,{auth.user?.userName}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <SettingsOutlinedIcon sx={{ marginRight: '5px' }} /> My account
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ExitToAppIcon sx={{ marginRight: '5px' }} />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/login" className="nav__btns--login">
              Login
              <FaUserPlus />
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
