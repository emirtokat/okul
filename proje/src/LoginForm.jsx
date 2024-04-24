import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles/loginform.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login successful!");
    navigate('/create-form');
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      <Link to="/forgot-password">Forgot Password?</Link>
      <Link to="/register">Don't have an account? Register</Link>
    </form>
  );
};

export default LoginForm;
