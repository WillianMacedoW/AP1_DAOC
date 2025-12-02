const API_BASE = 'https://fakestoreapi.com';

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Não foi possível carregar os produtos');
  const data = await res.json();
  return data.map(prod => ({
    ...prod,
    stock: prod.rating?.count ?? 0,
  }));
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error('Produto não encontrado');
  const prod = await res.json();
  return { ...prod, stock: prod.rating?.count ?? 0 };
}

export async function createProduct(payload) {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Erro ao criar produto');
  const prod = await res.json();
  return { ...prod, stock: payload.stock ?? 0 };
}

export async function updateProduct(id, payload) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Erro ao atualizar produto');
  const prod = await res.json();
  return { ...prod, stock: payload.stock ?? prod.rating?.count ?? 0 };
}
