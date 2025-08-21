import React, { useContext } from "react";
import { CartProvider, CartContext } from "./CartContext";
import DishesList from "./DishesList";
import Cart from "./Cart";
import "./App.css"; 

const dishes = [
  {
    id: 0,
    name: "Uthappizza",
    image: "images/uthappizza.png",
    price: "4.99",
    description: "A unique combination of Indian Uthappam and Italian pizza.",
  },
  {
    id: 1,
    name: "Zucchipakoda",
    image: "images/zucchipakoda.png",
    price: "1.99",
    description: "Deep fried Zucchini with chickpea batter.",
  },
  {
    id: 2,
    name: "Vadonut",
    image: "images/vadonut.png",
    price: "1.99",
    description: "A combination of vada and donut.",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    image: "images/elaicheesecake.png",
    price: "2.99",
    description: "New York Style Cheesecake with Indian cardamoms.",
  },
];

function TopNav() {
  const { cartItems, totalValue } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <span className="navbar-brand fw-semibold">🍽️ Food Cart</span>
        <div className="ms-auto d-flex align-items-center gap-2">
          <span className="badge text-bg-primary">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
          </span>
          <span className="badge text-bg-success">${totalValue}</span>
        </div>
      </div>
    </nav>
  );
}

function AppInner() {
  return (
    <>
      <TopNav />
      <main className="container py-4">
        <DishesList dishes={dishes} />
        <Cart />
      </main>
      <footer className="border-top py-3">
        <div className="container text-center text-muted small">
          Demo cart • React + Context + Bootstrap
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}
