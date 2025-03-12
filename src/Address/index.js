import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css';

const AddressForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5002/api/address', formData);
      if (response.status === 201) {
        setSuccess('✅ Address saved successfully!');
        setTimeout(() => navigate('/payments'), 2000); // Redirect after success
      }
    } catch (err) {
      setError('❌ Failed to save address. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="address-container">
      <h2>Enter Your Address</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input type="text" name="zip" placeholder="PIN Code" value={formData.zip} onChange={handleChange} required />
        
        <button type="submit">Save Address</button>
      </form>
    </div>
  );
};

export default AddressForm;
