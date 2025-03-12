import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './index.css';
import CartContext from '../CartContext/CartContext';


function Cart() {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useContext(CartContext);
  const navigate = useNavigate(); // Initialize navigate function

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to handle Buy Now click
  const handleBuyNow = () => {
    navigate('/address'); // Navigate to Address Page
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Home / Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty 🛒</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.image} alt={item.name} className="item-image" />
                <span className="item-name">{item.name}</span>

                <div className="quantity-controls">
                  <button className="quantity-button" onClick={() => updateCartItemQuantity(item._id, item.quantity - 1)}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="quantity-button" onClick={() => updateCartItemQuantity(item._id, item.quantity + 1)}>+</button>
                </div>

                <span className="item-price">₹{item.price}</span>

                <button className="remove-button" onClick={() => removeFromCart(item._id)}>X</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p className="order-total">Order Total: <span>₹{calculateTotal()}</span></p>
          
            <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;


