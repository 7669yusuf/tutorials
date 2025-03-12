# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




https://cdn.pixabay.com/photo/2016/11/18/17/14/cloth-1835894_1280.jpg

/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}
/* Center the login container */
.login-container {
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center; /* Centers vertically */
  height: 100vh;
  width: 100vw;
  background-image: url("https://cdn.pixabay.com/photo/2016/11/18/17/14/cloth-1835894_1280.jpg"); /* Replace with your background */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}
/* Login card */
.login-form {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
}

/* App title */
.app-title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
}

.trendz-highlight {
  color: #007bff;
}

/* Input groups */
.input-group {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 15px;
}

.input-group label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
}

.input-group input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
}

/* Input focus effect */
.input-group input:focus {
  border: 1px solid #007bff;
  box-shadow: 0px 0px 6px rgba(0, 123, 255, 0.5);
  outline: none;
}

/* Login button */
.login-button {
  background-color: #007bff;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.login-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.login-box {
  position: relative;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 350px;
}

/* Error & Success messages */
.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}

.success-message {
  color: green;
  font-size: 14px;
  margin-bottom: 10px;
}

/* Image section */
.image-section {
  display: none; /* Hide on small screens */
}

.shopping-image {
  width: 50%;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

/* Responsive Design */
@media (min-width: 768px) {
  .login-container {
    flex-direction: row;
  }

  .login-form {
    width: 400px;
  }

  .image-section {
    display: block;
  }
}

// Admin page

import React, { useState } from 'react';
import axios from 'axios';
import './index.css'

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    brand: '',
    image: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post('http://localhost:5002/api/products', product);
      setMessage(response.data.message);
      setProduct({ name: '', price: '', category: '', brand: '', image: '' }); // Clear form
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
      setLoading(false); // Set loading to false
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

css for admin

.add-product-container {
    width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h2 {
    color: #333;
    margin-bottom: 20px;
  }
  
  p {
    color: red;
    font-size: 14px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }
  
  button {
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #28a745;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  