import React from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
import { BrowserRouter } from 'https://esm.sh/react-router-dom@6.22.3';
import App from './App.js';
import { CartProvider } from './store.js';

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
