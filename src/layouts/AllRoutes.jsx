// src/AllRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Cart from "../pages/Cart";
import CheckoutPage from "../pages/CheckoutPage";
import Women from "../pages/Women";
import Men from "../pages/Men";
import SignupPage from "../pages/SignupPage";
import Collection from "../pages/Collection";
import Winter from "../pages/Winter";
import Core from "../pages/Core";
import Golf from "../pages/Golf";
import Summer from "../pages/Summer";
import LoginPage from "../pages/LoginPage";
import ProductPage from "../pages/ProductPage";
import Shop from "../pages/Shop";
import Wishlist from "../pages/Wishlist";

const AllRoutes = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      {/* Product details page expects productId */}
      <Route path="/explore/:productId" element={<ProductPage user={user} />} />
      
      {/* Optional: redirect /explore without id */}
      <Route path="/explore" element={<Navigate to="/shop" />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/continue" element={<CheckoutPage />} />
      <Route path="/men" element={<Men />} />
      <Route path="/shop" element={<Shop user={user} />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/winter" element={<Winter />} />
      <Route path="/core" element={<Core />} />
      <Route path="/golf" element={<Golf />} />
      <Route path="/summer" element={<Summer />} />
      <Route path="/women" element={<Women />} />
      <Route path="/login" element={<LoginPage />} />
            <Route path="/wishlist" element={<Wishlist />} />

    </Routes>
  );
};

export default AllRoutes;
