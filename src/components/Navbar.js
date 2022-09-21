import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserToken } from '../lib/auth.js';
import image2 from '../assets/images/logo-part-2.png';
import dot1 from '../assets/images/dot1.png';
import dot2 from '../assets/images/dot2.png';
import dot3 from '../assets/images/dot3.png';

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
        <div className="navbar-brand ">
          <Link to="/" className="has-text-success">
            <div className="navbar-logo-parent">
              <img className="navbar-image2" src={image2} />
              <img id="dot1" className="navbar-dot" src={dot1} />
              <img id="dot2" className="navbar-dot" src={dot2} />
              <img id="dot3" className="navbar-dot" src={dot3} />
              <span className="logo-text-navbar"></span>
            </div>
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
                <div className="navbar-item">
                  <Link to="/newchat">
                    <button className=" button ">New Chat</button>
                  </Link>
                </div>

                <div className="navbar-item">
                  <Link to="/mychats">
                    <button className=" button ">My Chats</button>
                  </Link>
                </div>
                <div className="navbar-item">
                  <button
                    className=" button is-success has-text-white"
                    onClick={logOut}
                  >
                    Log Out
                  </button>
                </div>
                <div className="navbar-item">
                  <Link to={'/profile'}>
                    <span className="icon has-text-success mt-2">
                      <i className="fas fa-user fa-xl"></i>
                    </span>
                  </Link>
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
