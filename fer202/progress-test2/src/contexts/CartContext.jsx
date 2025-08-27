import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const exist = cartItems.find((p) => p.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((p) => p.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const totalValue = cartItems.reduce(
    (sum, p) => sum + p.price * p.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalValue }}
    >
      {children}
    </CartContext.Provider>
  );
};
