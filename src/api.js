// src/api.js
const API_BASE = 'https://fakestoreapi.com';

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Falha ao carregar produtos');
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/products/categories`);
  if (!res.ok) throw new Error('Falha ao carregar categorias');
  return res.json();
}
