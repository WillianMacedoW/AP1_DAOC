// src/components/ProductCard.js
import { Store } from '../store.js';

export function ProductCard(product, { onToggleFavorite } = {}) {
  const { id, title, price, image, category, rating } = product;
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <div class="media">
      <img src="${image}" alt="${escapeHtml(title)}" loading="lazy"/>
    </div>
    <div class="title" title="${escapeHtml(title)}">${escapeHtml(truncate(title, 70))}</div>
    <div class="meta">
      <span class="category">${escapeHtml(category)}</span>
      <span class="stars" aria-label="Avaliação">★ ${rating?.rate ?? '-'}</span>
    </div>
    <div class="actions">
      <span class="price">R$ ${price.toFixed(2)}</span>
      <button class="fav-btn" aria-pressed="${Store.isFavorite(id)}" data-id="${id}">❤</button>
    </div>
  `;

  const favBtn = el.querySelector('.fav-btn');
  function updateFavState() {
    const active = Store.isFavorite(id);
    favBtn.classList.toggle('active', active);
    favBtn.setAttribute('aria-pressed', String(active));
  }
  updateFavState();

  favBtn.addEventListener('click', () => {
    Store.toggleFavorite(id);
    updateFavState();
    onToggleFavorite && onToggleFavorite(id);
  });

  return el;
}

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + '…' : str;
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}
