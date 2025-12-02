import React from 'https://esm.sh/react@18.2.0';
import { Routes, Route } from 'https://esm.sh/react-router-dom@6.22.3';
import Layout from './components/Layout.js';
import ProductList from './components/ProductList.js';
import ProductDetail from './components/ProductDetail.js';
import CartPage from './components/CartPage.js';
import ProductForm from './components/ProductForm.js';
import NotFound from './components/NotFound.js';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/produto/:id" element={<ProductDetail />} />
        <Route path="/carrinho" element={<CartPage />} />
        <Route path="/cadastro" element={<ProductForm mode="create" />} />
        <Route path="/editar/:id" element={<ProductForm mode="edit" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
