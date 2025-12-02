import React, { useEffect, useState } from 'https://esm.sh/react@18.2.0';
import { Link } from 'https://esm.sh/react-router-dom@6.22.3';
import { fetchProducts } from '../api.js';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    fetchProducts()
      .then(data => {
        if (mounted) setProducts(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (loading) return <p className="text-center text-muted">Carregando produtos...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-4">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Lista de Produtos</h1>
          <p className="text-muted text-sm">Clique em ver detalhes para saber mais ou adicionar ao carrinho.</p>
        </div>
        <Link to="/cadastro" className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:shadow-md">Cadastrar produto</Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map(prod => (
          <article key={prod.id} className="bg-white rounded-xl shadow border border-gray-100 flex flex-col">
            <div className="h-44 grid place-items-center p-4">
              <img src={prod.image} alt={prod.title} className="max-h-40 object-contain" loading="lazy" />
            </div>
            <div className="px-4 pb-4 flex-1 flex flex-col gap-2">
              <h2 className="font-semibold line-clamp-2 min-h-[48px]">{prod.title}</h2>
              <p className="text-lg font-bold">R$ {prod.price.toFixed(2)}</p>
              <p className={`text-sm font-medium ${prod.stock === 0 ? 'text-red-600' : 'text-muted'}`}>
                {prod.stock === 0 ? 'Esgotado' : `Estoque: ${prod.stock}`}
              </p>
              <Link
                to={`/produto/${prod.id}`}
                className={`mt-auto inline-flex items-center justify-center px-3 py-2 rounded-lg font-semibold ${prod.stock === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:shadow-md'}`}
              >
                Ver detalhes
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
