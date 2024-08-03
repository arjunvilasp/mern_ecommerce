import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import CartPage from "./pages/Cart/CartPage";
import HomePage from "./pages/Home/HomePage";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ProductPage from "./pages/Product/ProductPage";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";
import { useAuthContext } from "./context/authContext";
import Product from "./admin/Products";
import AddProduct from "./admin/AddProduct";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Category from "./pages/Category/Category";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import { useEffect } from "react";

const App = () => {

  const {authUser} = useAuthContext();

  const {pathname} = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/contact-us" element={<Contact/>} />
        <Route exact path="/user-profile/:userId" element={<Profile/>} />
        <Route exact path="/search/:query" element={<Search/>} />
        <Route path="/cart" element={authUser ? <CartPage/> : <Navigate to={'/login'}/>} />
        <Route path="/product/:product_id" element={<ProductPage />} />
        <Route path="/register" element={authUser ? <Navigate to={'/'}/> :<RegisterPage />} />
        <Route path="/login" element={authUser ? <Navigate to={'/'}/> : <LoginPage />} />
        <Route path="/admin/add-product" element={authUser ? <AddProduct /> :  <Navigate to={'/'}/>} />
        <Route path="/products" element={authUser ?  <Product /> :<Navigate to={'/'}/> }/>
        <Route path="/category/:category" element={ <Category /> }/>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
