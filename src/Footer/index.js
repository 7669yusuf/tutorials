import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Wave Effect */}
      

      {/* Social Media Icons */}
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      </div>

      {/* Navigation Links */}
      <nav className="footer-nav">
        <a href="/home">Home</a>
        <a href="/products">Products</a>
        <a href="/cart">Cart</a>
        <a href="/contact">Contact</a>
      </nav>

      {/* Copyright Text */}
      <p className="footer-text">©2025 QTrendz | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
