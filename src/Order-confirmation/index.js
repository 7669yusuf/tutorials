import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmation-container">
      <div className="confirmation-box">
        <h2>✅ Order Placed Successfully!</h2>
        <p>Your order has been confirmed. You will receive a confirmation email shortly.</p>
        <button className="home-btn" onClick={() => navigate('/home')}>Go to Home</button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
