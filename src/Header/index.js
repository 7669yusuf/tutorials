import './index.css';
import { useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/home")}>
        <span className="brand-name">Q</span>
        <span className="styled-text">Trendz</span>
      </div>
      <nav className="nav">
        <a href="/home" className="nav-link">Home</a>
        <a href="/products" className="nav-link">Products</a>
        <a href="/cart" className="nav-link">Cart</a>
        <a href="/logout" className="nav-link">Logout</a>
      </nav>
    </header>
  );
}


export default Header;
