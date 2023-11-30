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
import { logout } from '../../redux/slice/AuthSlice';
import { RootState } from '../../redux/store/configureStore';
import { Res_UserInfoLogin } from '../../types/response.type';
import { setTotalCart } from '../../redux/slice/CartSlice';
// import { I_authState, logout } from '../../redux/slice/AuthSlice';
// import { RootState } from '../../redux/store/configureStore';

export default function Header() {
  const [showNavMobile, setShowNavMobile] = useState(false);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const user = useSelector(
    (state: { auth: { user: Res_UserInfoLogin | null } }) => state.auth.user,
  );
  const quantityCart = useSelector((state: RootState) => state.cart.quantity);
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

  const handleLogout = async () => {
    handleClose();
    localStorage.removeItem('token');
    dispatch(logout());
    dispatch(setTotalCart(0));
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
                <span>0</span>
              </span>
            </Link>
            {isLogin ? (
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
              <span>{quantityCart}</span>
            </span>
          </Link>
          {isLogin ? (
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
                Hello ,{user && user?.user_name}
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
