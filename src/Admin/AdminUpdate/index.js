import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

function UpdateProduct() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    image: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch product details when the page loads
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setMessage("Failed to load product details.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.put(`http://localhost:5002/api/products/${id}`, product);
      setMessage(response.data.message);
      setTimeout(() => navigate("/admin"), 1000); // Redirect after update
    } catch (error) {
      setMessage("Error updating product.");
      console.error("Update Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-product-container">
      <h2>Update Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} required />
        <input type="text" name="brand" placeholder="Brand" value={product.brand} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Product"}</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
