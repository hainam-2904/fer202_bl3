import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import FavouritesPage from '../pages/FavouritesPage';
import CartPage from '../pages/CartPage';
import ViewDetails from '../pages/ViewDetails';
import Checkout from '../pages/Checkout';
import Products from "../pages/Products";
import Profile from "../pages/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/wishlist" element={<FavouritesPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/product/:id" element={<ViewDetails />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
