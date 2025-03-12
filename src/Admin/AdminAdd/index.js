import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    brand: '',
    image: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5002/api/products', product);
      setMessage(response.data.message);
      setProduct({ name: '', price: '', category: '', brand: '', image: '' });
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.message || 'Failed to add product'}`);
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        setMessage('Error: No response from server. Please check your network.');
        console.error('Network Error:', error.request);
      } else {
        setMessage('Error: An unexpected error occurred.');
        console.error('Unexpected Error:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
      
    </div>
  );
}

export default AddProduct;