import React, { useState, useEffect, useContext } from "react";
import "./index.css";
import axios from "axios";
import CartContext from "../CartContext/CartContext";
import Footer from '../Footer/index'

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [brandFilter, setBrandFilter] = useState("");
  const [sortByPrice, setSortByPrice] = useState("Lowest");
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["All", "Clothing", "Electronics", "Grocery", "Toys"];
  const brands = [
    "Nike",
    "Hermes",
    "Oucel",
    "Louis Vuitton",
    "Adidas",
    "Usha",
    "Whirlpool",
    "Samsung",
    "Apple",
    "Oneplus",
    "Vivo"
  ];

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => categoryFilter === "All" || product.category === categoryFilter)
    .filter((product) => brandFilter === "" || product.brand === brandFilter)
    .sort((a, b) =>
      sortByPrice === "Lowest" ? a.price - b.price : b.price - a.price
    );

  return (
    <div className="products-container">
      {/* Header Section */}
      <div className="products-header">
        <div className="breadcrumb">Home / Products</div>
        <div className="search-sort-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="products-count">{filteredProducts.length} Products Found</span>
          <select className="sort-dropdown" value={sortByPrice} onChange={(e) => setSortByPrice(e.target.value)}>
            <option value="Lowest">Sort By Price (Lowest)</option>
            <option value="Highest">Sort By Price (Highest)</option>
          </select>
        </div>
      </div>

     
      <div className="products-content">
        
        <div className="filters-container">
          <div className="filter-group">
            <h3 className="filter-title">Category</h3>
            <select className="filter-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Brand</h3>
            <select className="filter-select" value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <button className="clear-filters-btn" onClick={() => { setCategoryFilter("All"); setBrandFilter(""); }}>
            Clear filters
          </button>
        </div>

       
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
