import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  
  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/cart");
      setCartItems(response.data);
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart(); 
  }, []);

  
  const addToCart = async (product) => {
    try {
      const existingItem = cartItems.find((item) => item.productId === product._id);

      if (existingItem) {
        updateCartItemQuantity(existingItem._id, existingItem.quantity + 1);
      } else {
        await axios.post("http://localhost:5002/api/cart/add", {
          productId: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1,
        });

        fetchCart(); 
      }
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
    }
  };


  const updateCartItemQuantity = async (id, quantity) => {
    try {
      if (quantity < 1) {
        removeFromCart(id);
        return;
      }

      await axios.put("http://localhost:5002/api/cart/update", { id, quantity });
      fetchCart();
    } catch (error) {
      console.error("❌ Error updating cart item:", error);
    }
  };


  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/api/cart/remove/${id}`);
      fetchCart();
    } catch (error) {
      console.error("❌ Error removing cart item:", error);
    }
  };

  
  const clearCart = async () => {
    try {
      await axios.delete("http://localhost:5002/api/cart/clear");
      setCartItems([]);
    } catch (error) {
      console.error("❌ Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateCartItemQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

