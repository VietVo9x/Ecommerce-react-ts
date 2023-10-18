import './style.scss';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUserPlus, FaBars, FaWindowClose } from 'react-icons/fa';
import { links } from '../../routes';
import { useState } from 'react';
export default function Header() {
  const [showNavMobile, setShowNavMobile] = useState(false);

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
            <Link to="/login" className="nav__btns--login" onClick={() => setShowNavMobile(false)}>
              Login
              <FaUserPlus />
            </Link>
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
          <Link to="/login" className="nav__btns--login">
            Login
            <FaUserPlus />
          </Link>
        </div>
      </nav>
    </>
  );
}
