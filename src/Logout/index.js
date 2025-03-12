import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    
    localStorage.removeItem('token');

    setTimeout(() => {
      navigate('/');
    }, 1500);
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2>Logging out...</h2>
      <p>You will be redirected to the login page shortly.</p>
    </div>
  );
}

export default Logout;
