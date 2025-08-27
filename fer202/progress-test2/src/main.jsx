import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./contexts/Authcontext";
import { CartProvider } from "./contexts/CartContext";
import { ToastProvider } from "./contexts/ToastContext";
//Sau này sẽ bọc Provider context vào đây

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
