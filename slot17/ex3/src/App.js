import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import { ToastProvider, ToastContext } from "./context/ToastContext";
import ToastMessage from "./components/ToastMessage";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";
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
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <FavouritesProvider>
                <AppContent />
              </FavouritesProvider>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}