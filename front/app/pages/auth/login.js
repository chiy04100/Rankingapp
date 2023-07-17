import { useState, useContext } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { AuthContext } from './authcontext';

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        email,
        password,
      });
      if (response.data.length === 1) {
        login(response.data[0].id, response.data[0].username);
        Router.push('/');
      } else {
        setErrorMessage('No users found with the given email and passworc');
      }
    } catch (error) {
      console.error('ログインエラー:', error);
    }
  };
  

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="mt-4">ログイン</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          ログイン
        </button>
      </form>
    </div>
  );
}

export default Login;
