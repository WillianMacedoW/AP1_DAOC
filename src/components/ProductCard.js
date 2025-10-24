// src/components/ProductCard.js
import { Store } from '../store.js';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 2,
});

export function ProductCard(product, { onToggleFavorite } = {}) {
  const { id, title, price, image, category, rating } = product;
  const el = document.createElement('article');
  el.className = 'card';
  const priceLabel = currencyFormatter.format(price);
  const ratingValue = typeof rating?.rate === 'number' ? rating.rate : null;
  const ratingLabel = ratingValue ? ratingValue.toFixed(1).replace('.', ',') : '-';
  el.innerHTML = `
    <div class="media">
      <img src="${image}" alt="${escapeHtml(title)}" loading="lazy"/>
    </div>
    <div class="title" title="${escapeHtml(title)}">${escapeHtml(truncate(title, 70))}</div>
    <div class="meta">
      <span class="category">${escapeHtml(category)}</span>
      <span class="stars" aria-label="Avaliação">★ ${ratingLabel}</span>
    </div>
    <div class="actions">
      <span class="price">${priceLabel}</span>
      <button class="fav-btn" aria-pressed="${Store.isFavorite(id)}" data-id="${id}" type="button">
        ❤
      </button>
    </div>
  `;

  const favBtn = el.querySelector('.fav-btn');
  function updateFavState() {
    const active = Store.isFavorite(id);
    favBtn.classList.toggle('active', active);
    favBtn.setAttribute('aria-pressed', String(active));
    favBtn.setAttribute('aria-label', active ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
    favBtn.setAttribute('title', active ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
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
