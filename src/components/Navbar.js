import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserToken } from '../lib/auth.js';

const Navbar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    navigate('/');
  };
  return (
    <header>
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/register" className="navbar-item">
              Register
            </Link>
            <Link to="/login" className="navbar-item">
              Login
            </Link>
            {getLoggedInUserToken() && (
              <>
                <Link to="/newchat" className="navbar-item">
                  New Chat
                </Link>

                <Link to="/mychats" className="navbar-item">
                  My Chats
                </Link>
                <button onClick={logOut}>Log Out</button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
