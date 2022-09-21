import React from 'react';
import { loginUser } from '../lib/api';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserToken } from '../lib/auth.js';

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    email: '',
    password: ''
  });

  const [errorMessage, updateErrorMessage] = React.useState('');

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const getData = async () => {
      try {
        const { data } = await loginUser(user);
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('userId', data.userid);
        navigate('/mychats');
      } catch (err) {
        updateErrorMessage(err.response.data.message);
      }
    };
    getData();
    getLoggedInUserToken();
  }

  return (
    <section className="section p-1">
      <div className="container">
        <div className="columns mt-6">
          <form
            className="box column is-half is-offset-one-quarter"
            onSubmit={handleSubmit}
          >
            <p className="title has-text-centered">Login</p>{' '}
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
                Log In
              </button>
              <small className="has-text-danger"> {errorMessage}</small>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
