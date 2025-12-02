import React from 'https://esm.sh/react@18.2.0';
import { Link } from 'https://esm.sh/react-router-dom@6.22.3';

export default function NotFound() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">404 - Página não encontrada</h1>
      <Link to="/" className="text-primary font-semibold">Voltar para a Home</Link>
    </div>
  );
}
