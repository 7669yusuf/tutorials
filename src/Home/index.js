import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import Footer from '../Footer/index'

const Home = () => (
  <div>
  <div className="full-container">
    {/* Left Section: Text Content */}
    <div className="container">
      <h1 className="title">Clothes That Get YOU Noticed</h1>
      <p className="description">
        Fashion is part of the daily air, and it does not quite help that it changes all the time.
        Clothes have always been a marker of the era, and we are in a revolution. Your fashion
        makes you seen and heard in your own way. So, celebrate the season’s new and exciting
        fashion in your style.
      </p>
      <Link to="/products">
        <button className="shop-now-button">Shop Now</button>
      </Link>
    </div>

    {/* Right Section: Images */}
    <div className="image-container">
      <div className="background-box"></div>
      <img
        src="https://cdn.pixabay.com/photo/2020/06/20/12/55/fashion-5320934_1280.jpg"
        alt="Fashion Model"
        className="main-image"
      />
    </div>
  </div>
  <Footer />
  </div>
);

export default Home;