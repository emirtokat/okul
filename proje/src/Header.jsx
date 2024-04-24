import React from 'react';
import { Link } from 'react-router-dom';
import './styles/header.css'

const Header = () => (
  <header className="app-header">
    <div className="header-content">
      <h1 className="app-title">Poll-IO</h1>
      <nav className="navigation">
        <ul className="nav-links">
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/create-form">Create Form</Link></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
