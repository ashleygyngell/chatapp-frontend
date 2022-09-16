import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="section">
      <div className="container">
        <p className="title has-text-centered has-text-success">Chat</p>{' '}
        <div className="columns container has-text-centered ">
          <div className="column is-half">
            <Link to="/signup">
              <button className=" button ">Sign Up</button>
            </Link>
          </div>
          <div className="column is-half">
            <Link to="/login">
              <button className=" button is-success has-text-white">
                Login
              </button>
            </Link>
          </div>

          {/* <form
            className="box column is-half is-offset-one-quarter"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={user.email}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={user.password}
                />
              </div>
            </div>
            <div className="field">
              <button type="submit" className="button is-fullwidth is-success">
                Log Me In!
              </button>
            </div>
          </form> */}
        </div>
      </div>
    </section>
  );
};

export default Home;
