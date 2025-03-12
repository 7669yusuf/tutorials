import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";

function AdminDeleteProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5002/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Product Function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
        return;
    }

    try {
        const response = await axios.delete(`http://localhost:5002/api/products/${id}`);
        alert(response.data.message);

        // Update UI after deleting (assuming you have `products` and `setProducts`)
        setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
        console.error("Error deleting product:", error);
        alert("❌ Failed to delete product");
    }
};

  return (
    <div className="admin-container">
      <h2>🛍️ Admin Product List</h2>

      <Link to="/admin">
        <button className="add-btn">➕ Add Product</button>
      </Link>

      {loading ? <p>Loading products...</p> : null}

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img src={product.image} width="50" alt={product.name} />
                </td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDeleteProducts;
