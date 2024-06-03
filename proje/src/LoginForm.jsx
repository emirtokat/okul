import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
        <button type="submit" className="btn btn-primary">Login</button>
        <Link to="/forgot-password" className="btn-link">Forgot Password?</Link>
        <Link to="/register" className="btn-link">Don't have an account? Register</Link>
      </form>
    </div>
  );
};

export default LoginForm;
