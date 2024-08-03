import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.jsx";
import { ProductWishlistProvider } from "./context/productWishlist.jsx";
import { CartContextProvider } from "./context/cartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <ProductWishlistProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductWishlistProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
