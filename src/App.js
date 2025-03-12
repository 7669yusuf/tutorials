import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home/index';
import NotFound from './NotFound/index';
import Login from './Login/index';
import Products from './Products/index';
import Cart from './Cart/index';
import Header from './Header';
import Admin from './Admin/index';
import { CartProvider } from './CartContext/CartContext';
import Logout from './Logout/index';
import Address from './Address/index'
import Payment from './Payments/index';
import OrderConfirmation from './Order-confirmation/index';
import DeleteProduct from './Admin/AdminDelete/index'
import AddProduct from './Admin/AdminAdd/index';
import UpdateProduct from './Admin/AdminUpdate/index';
import Footer from './Footer/index'
import Contact from './Contact/index'

const AppContent = () => {
  const location = useLocation();
  const hideHeaderPaths = ["/"]; 

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route exact path="/home" Component={Home} />
        <Route path="*" Component={NotFound} />
        <Route exact path="/products" Component={Products} />
        <Route exact path="/" Component={Login} />
        <Route exact path="/cart" Component={Cart} />
        <Route exact path="/admin" Component={Admin}/>
        <Route exact path="/logout" Component={Logout} />
        <Route exact path="/address" Component={Address} />
        <Route exact path='payments' Component={Payment} />
        <Route exact path='order-confirmation' Component={OrderConfirmation} />
        <Route exact path='/admin/delete-product' Component={DeleteProduct} />
        <Route exact path='/admin/add-product' Component={AddProduct} />
        <Route exact path='/admin/update-product' Component={UpdateProduct} />
        <Route exact path = '/footer' Component ={Footer} />
        <Route exact path='contact' Component={Contact} />
      </Routes>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <CartProvider>
      <AppContent />
    </CartProvider>
  </BrowserRouter>
);

export default App;

