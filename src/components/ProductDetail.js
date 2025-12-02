import React, { useEffect, useState } from 'https://esm.sh/react@18.2.0';
import { useNavigate, useParams, Link } from 'https://esm.sh/react-router-dom@6.22.3';
import { fetchProduct } from '../api.js';
import { useCart } from '../store.js';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, items, message, setMessage } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    fetchProduct(id)
      .then(prod => mounted && setProduct(prod))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, [id]);

  useEffect(() => {
    setMessage('');
    return () => setMessage('');
  }, [setMessage]);

  if (loading) return <p className="text-muted">Carregando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return null;

  const inCart = items.find(item => item.id === product.id);
  const reachedStock = inCart ? inCart.quantity >= product.stock : false;
  const disabled = product.stock === 0 || reachedStock;

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div className="bg-white shadow rounded-xl p-6 flex items-center justify-center">
        <img src={product.image} alt={product.title} className="max-h-80 object-contain" />
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-lg text-muted">{product.description}</p>
        <div className="text-2xl font-semibold">R$ {product.price.toFixed(2)}</div>
        <div className={`text-sm font-medium ${product.stock === 0 ? 'text-red-600' : 'text-gray-700'}`}>
          Estoque: {product.stock === 0 ? 'Esgotado' : product.stock}
        </div>
        {message && <p className="text-red-600 text-sm">{message}</p>}
        <div className="flex gap-3">
          <button
            onClick={() => addToCart(product)}
            disabled={disabled}
            className={`px-4 py-2 rounded-lg font-semibold ${disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:shadow-md'}`}
          >
            Adicionar ao carrinho
          </button>
          <Link to={`/editar/${product.id}`} className="px-4 py-2 rounded-lg border border-gray-200 font-semibold hover:bg-gray-100">
            Editar
          </Link>
          <button onClick={() => navigate('/')} className="px-4 py-2 rounded-lg border border-gray-200 font-semibold hover:bg-gray-100">Voltar</button>
        </div>
        {reachedStock && <p className="text-red-600 text-sm">Estoque máximo atingido</p>}
      </div>
    </div>
  );
}
