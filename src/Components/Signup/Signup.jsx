import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import {login, signup } from '../../Firebase';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [signstate, setsignstate] = useState('Sign In');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const user_auth =async (event)=>{
    event.preventDefault();
    // setloading('true')
    if(signstate==='Sign In'){
      await login(email,password);
    }else{
      await signup(username,email,phone,password);
      navigate('/login');
    }
    // setloading(false)
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form>
          {signstate === 'Sign Up' && (
            <>
              <label htmlFor="fname">Username</label>
              <br />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                name="username"
              />
              <br />
              <label htmlFor="phone">Phone</label>
              <br />
              <input
                className="input"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                id="phone"
                name="phone"
              />
              <br />
            </>
          )}
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <br />
          <br />
          <button onClick={user_auth} type="submit">
            {signstate === 'Sign In' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        {signstate === 'Sign In' ? (
          <p>
           Don't have an account?{' '}
            <span onClick={() => setsignstate('Sign Up')}>Sign up</span>
          </p>
        ) : (
          <p>
           Alredy have an account?{' '}
            <span onClick={() => setsignstate('Sign In')}>Login</span>
          </p>
        )}
      </div>
    </div>
  );
}
