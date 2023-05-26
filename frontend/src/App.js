import './App.css';
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import HomePage from './pages/HomePage';
import { ToastContainer, toast } from 'react-toastify';
import MenuItemsPage from './pages/MenuItemsPage';
import { useLocation } from 'react-router-dom'
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderPage from './pages/OrderPage';
import SuccessPage from './pages/SuccessPage';
import FailPage from './pages/FailPage';


function App() {
  const { user, fetchCategories, fetchCategoryMenu, fetchAllProducts, fetchProduct, fetchOrder,getFromSessionStorage} = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("menu")) {
      const pathname = location.pathname;
      const menuPath = pathname.split('/');
      const menuId = menuPath[menuPath.length - 1];
      fetchCategoryMenu(menuId);

    }
    else if (location.pathname.includes("product")) {
      const pathname = location.pathname;
      const productPath = pathname.split('/');
      const productId = productPath[productPath.length - 1];
      const menuId = productPath[productPath.length - 3];
      fetchProduct(productId);
      fetchCategoryMenu(menuId);
    }
    else if (location.pathname.includes("user")) {
      const pathname = location.pathname;
      const orderPath = pathname.split('/');
      const orderId = orderPath[orderPath.length - 1];
      fetchOrder(orderId);
    }

    getFromSessionStorage();
    fetchCategories();
    fetchAllProducts();

  }, [location.pathname])

  return (
    <div id='wrapper'>
      <ToastContainer
        position="top-center"
        autoClose={1500}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:id/product/:id" element={<ProductPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/fail" element={<FailPage />} />
        <Route path="/menu/:menuId" element={<MenuItemsPage />} />
        {user && <Route path="/orders" element={<OrdersPage />} />}
        {user && <Route path="/user/order/:orderId" element={<OrderPage />} />}
        {user &&  <Route path="/checkout" element={<CheckoutPage />} />}
      </Routes>
    </div>


  );
}

export default App;
