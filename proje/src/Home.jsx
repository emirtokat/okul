import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleCreateFormClick = () => {
    navigate('/create-form');
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Poll-IO</h1>
        <p>Create and share your surveys easily.</p>
        <button className="btn btn-primary" onClick={handleCreateFormClick}>Create a Form</button>
      </div>
    </div>
  );
};

export default Home;
