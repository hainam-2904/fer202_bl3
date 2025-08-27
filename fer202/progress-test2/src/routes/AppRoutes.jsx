import { Route, Routes } from 'react-router-dom';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import LoginPage from '../pages/LoginPage';
export default function AppRoutes() {
  return <Routes>
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/products/:id" element={<ProductDetailsPage />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>;
}
