import React from 'react';
import { registerUser } from '../lib/api';
import { loginUser } from '../lib/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    image: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [errorMessage, updateErrorMessage] = React.useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        await registerUser(user);
        navigate('/');
      } catch (err) {
        updateErrorMessage(err.response.data);
      }
    };
    getData();
  }

  return (
    <section className="section p-1">
      <div className="container">
        <div className="columns mt-6">
          <form
            className="column is-half is-offset-one-quarter box"
            onSubmit={handleSubmit}
          >
            <p className="title has-text-centered">Register</p>{' '}
            <div className="field">
              <label className="label">Profile Image</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Leave URL blank for default"
                  name="image"
                  onChange={handleChange}
                  value={user.image}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}
                  value={user.username}
                />
              </div>
              <small className="has-text-danger">
                {' '}
                {errorMessage.username}
              </small>
            </div>
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
              <small className="has-text-danger">{errorMessage.email}</small>
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
              <small className="has-text-danger">{errorMessage.password}</small>
            </div>
            <div className="field">
              <label className="label">Password Confirmation</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  placeholder="Password Confirmation"
                  name="password_confirmation"
                  onChange={handleChange}
                  value={user.password_confirmation}
                />
              </div>
              <small className="has-text-danger">
                {errorMessage.password_confirmation}
              </small>
            </div>
            <div className="field">
              <button type="submit" className="button is-fullwidth is-success">
                Register Me!
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
