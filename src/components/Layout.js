import React from 'https://esm.sh/react@18.2.0';
import { Link, useLocation, useNavigate } from 'https://esm.sh/react-router-dom@6.22.3';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <button onClick={() => navigate(-1)} className="text-sm text-muted hover:text-primary">⬅ Voltar</button>
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-semibold text-primary">🛍️ Loja React</Link>
            <nav className="flex gap-4 text-sm font-semibold">
              <NavLink to="/" active={pathname === '/'}>Home</NavLink>
              <NavLink to="/carrinho" active={pathname === '/carrinho'}>Carrinho</NavLink>
              <NavLink to="/cadastro" active={pathname === '/cadastro'}>Cadastro</NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">{children}</main>
    </div>
  );
}

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-lg ${active ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
    >
      {children}
    </Link>
  );
}
