import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUserToken } from '../lib/auth.js';

import image2 from '../assets/images/C5.png';
import image3 from '../assets/images/C2.png';
import image4 from '../assets/images/C3.png';
import image5 from '../assets/images/C4.png';

const Home = () => {
  return (
    <section className="section">
      <div className="container">
        {!getLoggedInUserToken() && (
          <>
            <div className="logo-container">
              <div className="parent">
                <img id="logo-text" className="image2" src={image2} />
                <img id="dot-1" className="image1" src={image3} />
                <img id="dot-2" className="image1" src={image4} />
                <img id="dot-3" className="image1" src={image5} />
              </div>
            </div>
            <div className=" has-text-centered ">
              <div className="column ">
                <Link to="/register">
                  <button id="homepage-button" className=" button ">
                    Register
                  </button>
                </Link>
              </div>

              <div className="column ">
                <Link to="/login">
                  <button
                    id="homepage-button"
                    className=" button is-success has-text-white"
                  >
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
                <img id="logo-text" className="image2" src={image2} />
                <img id="dot-1" className="image1" src={image3} />
                <img id="dot-2" className="image1" src={image4} />
                <img id="dot-3" className="image1" src={image5} />
              </div>
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
