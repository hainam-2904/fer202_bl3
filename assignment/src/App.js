import React, { useContext } from "react";
import AppNavbar from "./components/Navbar"; 
import AppRoutes from "./routes/AppRoutes";
import CartProvider  from "./context/CartContext";
import  WishlistProvider  from "./context/FavouritesContext";
import { ToastProvider, ToastContext } from "./context/ToastContext";
import ToastMessage from "./components/ToastMessage";
import  AuthProvider  from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";

//json-server --watch db.json --port 5000

function AppContent() {
  const { state, hideToast } = useContext(ToastContext);

  return (
    <>
      <AppNavbar />
      <AppRoutes />
      <ToastMessage
        show={state.show}
        onClose={hideToast}
        message={state.message}
        bg={state.bg}
      />
      <Footer />  
    </>
  );
}

  export default function App() {
  return (
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                <AppContent />
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
  );
}