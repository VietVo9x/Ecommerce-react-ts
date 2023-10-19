import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './style.scss';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserPlus, FaBars, FaWindowClose } from 'react-icons/fa';
import { links } from '../../routes';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { I_authState } from '../../redux/slice/AuthSlice';
import { getData, putData } from '../../utils/DB';
import { UserEntities } from '../../Entities';
export default function Header() {
  const [showNavMobile, setShowNavMobile] = useState(false);
  const user = useSelector((state: { auth: I_authState }) => state.auth);
  const token = useSelector((state: { token: string }) => state.token);
  console.log(user);
  const dispatch = useDispatch();
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

  const handleLogout = async () => {
    const users = await getData('users');
    const response = users.find((account: UserEntities) => account.token == token);
    console.log(response);
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
            {user.isLogin ? (
              <>
                <Link
                  to="/account"
                  className="nav__btns--login"
                  onClick={() => setShowNavMobile(false)}
                >
                  Account
                  <SettingsOutlinedIcon />
                </Link>
                <Link to={''} className="nav__btns--login">
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
              <span>0</span>
            </span>
          </Link>
          {user.isLogin ? (
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
                {user.user?.userName}
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
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleLogout();
                  }}
                >
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
