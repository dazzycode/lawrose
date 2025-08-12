
// src/AllRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import Cart from "../pages/Cart";
import CheckoutPage from "../pages/CheckoutPage";
import Women from "../pages/Women";
import Men from "../pages/Men";
import Shop from "../pages/Shop";
import SignupPage from "../pages/SignupPage";
import Collection from "../pages/Collection";
import Winter from "../pages/Winter";
import Core from "../pages/Core";
import Golf from "../pages/Golf";
import Summer from "../pages/Summer";
import LoginPage from "../pages/LoginPage";



const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
              <Route path="/explore" element={<ProductPage/>} />
                   <Route path="/cart" element={<Cart/>} />
                   <Route path="/continue" element={<CheckoutPage/>} />
                   <Route path="/men" element={<Men/>} />
                   <Route path="/shop" element={<Shop/>} />
S                   <Route path="/signup" element={<SignupPage/>} />
S                   <Route path="/collection" element={<Collection/>} />
S                   <Route path="/winter" element={<Winter/>} />
S                   <Route path="/core" element={<Core/>} />
S                   <Route path="/golf" element={<Golf/>} />
S                   <Route path="/summer" element={<Summer/>} />
S                   <Route path="/women" element={<Women/>} />
S                   <Route path="/login" element={<LoginPage/>} />

    </Routes>
  );
};

export default AllRoutes;
