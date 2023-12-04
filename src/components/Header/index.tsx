import * as React from 'react';
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
import { logout } from '../../redux/slice/auth.slice';
import { RootState } from '../../redux/store/configureStore';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { setTotalCart } from '../../redux/slice/cart.slice';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Res_UserInfoLogin } from '../../types/response.type';

export default function Header() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const settings: string[] = ['Account', 'Logout'];
  const [showNavMobile, setShowNavMobile] = useState(false);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const quantityCart = useSelector((state: RootState) => state.cart.quantity);
  const user = useSelector(
    (state: { auth: { isLogin: Boolean; user: Res_UserInfoLogin } }) => state.auth.user,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Mui menu account start
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    navigate('/account');
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
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
            <Box sx={{ flexGrow: 0 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Typography
                  component={'h2'}
                  textAlign="center"
                  color={'secondary'}
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                  }}
                >
                  Hello,{user?.user_name}
                </Typography>
              </Stack>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <SettingsIcon />
                    Account
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography
                    textAlign="center"
                    style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <LogoutIcon />
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
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
