
// src/AllRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import Cart from "../pages/Cart";
import CheckoutPage from "../pages/CheckoutPage";



const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
              <Route path="/explore" element={<ProductPage/>} />
                   <Route path="/cart" element={<Cart/>} />
                   <Route path="/continue" element={<CheckoutPage/>} />

    </Routes>
  );
};

export default AllRoutes;
