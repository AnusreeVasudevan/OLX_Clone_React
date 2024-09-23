import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { login } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
function Login({props}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const user_auth = async (event) => {
    event.preventDefault();
   
      await login(email, password);
       
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={user_auth}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button  onClick={user_auth}   type="submit">Login</button>
        </form>
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}

export default Login;
