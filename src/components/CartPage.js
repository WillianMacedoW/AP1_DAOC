import React from 'https://esm.sh/react@18.2.0';
import { Link } from 'https://esm.sh/react-router-dom@6.22.3';
import { useCart } from '../store.js';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total, message } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Seu carrinho está vazio</h1>
        <Link to="/" className="text-primary font-semibold">Voltar para a loja</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Carrinho</h1>
      {message && <p className="text-red-600 text-sm">{message}</p>}
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-muted">Preço unitário: R$ {item.price.toFixed(2)}</p>
              <p className="text-sm text-muted">Estoque máximo: {item.stock}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-2 rounded-lg border">-</button>
              <span className="font-semibold w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="px-3 py-2 rounded-lg border"
                disabled={item.quantity >= item.stock}
              >
                +
              </button>
            </div>
            <div className="font-semibold">Total: R$ {(item.price * item.quantity).toFixed(2)}</div>
            <button onClick={() => removeFromCart(item.id)} className="text-red-600 font-semibold">Remover</button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center bg-white rounded-xl shadow border border-gray-100 p-4">
        <span className="font-semibold text-lg">Total geral</span>
        <span className="text-2xl font-bold">R$ {total.toFixed(2)}</span>
      </div>
    </div>
  );
}
