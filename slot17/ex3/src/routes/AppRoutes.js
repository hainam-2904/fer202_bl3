import React from "react";
import { Routes, Route } from "react-router-dom";
import Products from "../pages/Products";
import Register from "../pages/Register";
import CartPage from "../pages/CartPage";
import FavouritesPage from "../pages/FavouritesPage";
import ViewDetails from "../pages/ViewDetails";
import Login from "../pages/Login";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/products/:id" element={<ViewDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default AppRoutes;
