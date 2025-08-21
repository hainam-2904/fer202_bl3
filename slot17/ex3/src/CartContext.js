import React, { createContext, useState, useEffect } from "react";

// Tạo context cho Cart
export const CartContext = createContext();

// CartProvider bao bọc các component con
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Thêm sản phẩm
  const addToCart = (dish) => {
    setCartItems((prevItems) => [...prevItems, dish]);
  };

  // Xóa 1 sản phẩm theo id
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCartItems([]);
  };

  // Tính tổng giá trị
  const totalValue = cartItems
    .reduce((acc, item) => acc + parseFloat(item.price), 0)
    .toFixed(2);

  // Lưu giỏ hàng vào localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCart) {
      setCartItems(savedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalValue }}
    >
      {children}
    </CartContext.Provider>
  );
};
