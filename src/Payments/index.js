import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Import CSS file for styling
import image from '../IMG_20250310_225944.jpg'

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (paymentMethod === 'card' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
      setError('❌ Please fill all card details.');
      return;
    }
    if (paymentMethod === 'upi' && !formData.upiId) {
      setError('❌ Please enter your UPI ID.');
      return;
    }

    alert('✅ Payment Successful!');
    navigate('/order-confirmation'); // Navigate to order confirmation page after payment
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={() => setPaymentMethod('card')}
          />
          Credit/Debit Card
        </label>

        <label>
          <input
            type="radio"
            value="upi"
            checked={paymentMethod === 'upi'}
            onChange={() => setPaymentMethod('upi')}
          />
          UPI
        </label>

        <label>
          <input
            type="radio"
            value="qr"
            checked={paymentMethod === 'qr'}
            onChange={() => setPaymentMethod('qr')}
          />
          QR Code
        </label>

        {paymentMethod === 'card' && (
          <div className="card-details">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              maxLength="16"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              maxLength="3"
              onChange={handleChange}
              required
            />
          </div>
        )}

        {paymentMethod === 'upi' && (
          <input
            type="text"
            name="upiId"
            placeholder="Enter UPI ID"
            onChange={handleChange}
            required
          />
        )}

{paymentMethod === 'qr' && (
          <img src={image} alt='qr code'
      
          />
        )}

        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Payment;

