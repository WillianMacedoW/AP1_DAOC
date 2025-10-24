// src/components/Header.js
export function renderHeader({ currentRoute }) {
  const header = document.getElementById('app-header');
  header.className = 'site-header';

  header.innerHTML = `
    <div class="navbar">
      <div class="brand">🛍️ FakeStore</div>
      <nav class="nav">
        <a href="#/products" data-link="products">Produtos</a>
        <a href="#/favorites" data-link="favorites">Favoritos</a>
        <a href="https://fakestoreapi.com/" target="_blank" rel="noreferrer">API</a>
      </nav>
    </div>
  `;

  // Mark active link
  header.querySelectorAll('a[data-link]').forEach(a => {
    a.classList.toggle('active', a.getAttribute('data-link') === currentRoute);
  });
}
