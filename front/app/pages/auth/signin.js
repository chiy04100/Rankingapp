import { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './authcontext';


function Signin() {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users', {
        user: {
          username,
          email,
          password,
        }
      });
      if (response.status === 201) {
        login(response.data.id, response.data.username);
        Router.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="mt-4">サインイン</h1>
      <form onSubmit={handleSignin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            ユーザー名
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={handleChangeUsername}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            メールアドレス
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
            パスワード
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
          サインイン
        </button>
      </form>
    </div>
  );
}

export default Signin;
