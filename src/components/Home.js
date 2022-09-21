import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUserToken } from '../lib/auth.js';
import image1 from '../assets/images/logo-part-1.png';
import image2 from '../assets/images/logo-part-2.png';

const Home = () => {
  return (
    <section className="section">
      <div className="container">
        {!getLoggedInUserToken() && (
          <>
            <div className="logo-container">
              <div className="parent">
                <img id="image2" className="image2" src={image2} />
                <img id="image1" className="image1" src={image1} />
              </div>
              <span className="logo-text">Chat</span>
            </div>
            <div className=" has-text-centered ">
              <div className="column ">
                <Link to="/register">
                  <button className=" button ">Register</button>
                </Link>
              </div>

              <div className="column ">
                <Link to="/login">
                  <button className=" button is-success has-text-white">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
        {getLoggedInUserToken() && (
          <>
            <div className="logo-container">
              <div className="parent">
                <img className="image1" src={image1} />
                <img id="image2" className="image2" src={image2} />
              </div>
              <span className="logo-text">hat</span>
            </div>

            <div className=" has-text-centered">
              <div className="column ">
                <Link to="/mychats">
                  <button className=" button ">My Chats</button>
                </Link>
              </div>

              <div className="column ">
                <Link to="/logout">
                  <button className=" button is-success has-text-white">
                    Logout
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
