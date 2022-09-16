import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserToken } from '../lib/auth.js';
import logo from '../assets/logos/chatlogo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const [openBurger, setOpenBurger] = React.useState(false);

  const toggleBurgerMenu = () => {
    setOpenBurger(!openBurger);
  };

  return (
    <header>
      <nav className="navbar is-white ">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item has-text-success">
            <img className="pr-1 " src={logo} alt="" />
            Chat
          </Link>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            href="#"
            onClick={toggleBurgerMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={openBurger ? 'navbar-menu is-active' : 'navbar-menu'}>
          <div className="navbar-end">
            {!getLoggedInUserToken() && (
              <>
                <div className="navbar-item">
                  <Link to="/register">
                    <button className=" button ">Register</button>
                  </Link>
                </div>
                <div className="navbar-item">
                  <Link to="/login">
                    <button className=" button is-success has-text-white">
                      Login
                    </button>
                  </Link>
                </div>
              </>
            )}
            {getLoggedInUserToken() && (
              <>
                <Link to="/newchat" className="navbar-item">
                  New Chat
                </Link>

                <Link to="/mychats" className="navbar-item">
                  My Chats
                </Link>
                <div className="navbar-item">
                  <button
                    className=" button is-success has-text-white"
                    onClick={logOut}
                  >
                    Log Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
