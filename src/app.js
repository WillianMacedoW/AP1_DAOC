// src/app.js
import { fetchProducts, fetchCategories } from './api.js';
import { Store } from './store.js';
import { renderHeader } from './components/Header.js';
import { ProductCard } from './components/ProductCard.js';

// Simple hash-based router
const Routes = {
  products: 'products',
  favorites: 'favorites',
};

const state = {
  products: [],
  filtered: [],
  route: Routes.products,
  filters: {
    q: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
  },
};

const els = {
  loader: () => document.getElementById('loader'),
  productsGrid: () => document.getElementById('products-grid'),
  productsEmpty: () => document.getElementById('products-empty'),
  favoritesGrid: () => document.getElementById('favorites-grid'),
  favoritesEmpty: () => document.getElementById('favorites-empty'),
  search: () => document.getElementById('search-input'),
  category: () => document.getElementById('category-select'),
  rating: () => document.getElementById('rating-select'),
  minPrice: () => document.getElementById('min-price'),
  maxPrice: () => document.getElementById('max-price'),
  clearFilters: () => document.getElementById('clear-filters'),
  themeToggle: () => document.getElementById('theme-toggle'),
};

function showLoader(show) {
  els.loader().classList.toggle('hidden', !show);
}

function setRouteFromHash() {
  const hash = location.hash.replace('#/', '');
  state.route = hash === Routes.favorites ? Routes.favorites : Routes.products;
  renderHeader({ currentRoute: state.route });
  document.getElementById('view-products').classList.toggle('active', state.route === Routes.products);
  document.getElementById('view-favorites').classList.toggle('active', state.route === Routes.favorites);
  updateView();
}

function applyFilters() {
  const { q, category, minPrice, maxPrice, minRating } = state.filters;
  const qNorm = q.trim().toLowerCase();
  state.filtered = state.products.filter(p => {
    const byName = !qNorm || p.title.toLowerCase().includes(qNorm);
    const byCategory = !category || p.category === category;
    const byPriceMin = !minPrice || p.price >= parseFloat(minPrice);
    const byPriceMax = !maxPrice || p.price <= parseFloat(maxPrice);
    const byRating = !minRating || (p.rating && p.rating.rate >= parseFloat(minRating));
    return byName && byCategory && byPriceMin && byPriceMax && byRating;
  });
}

function renderProductsList(list, container) {
  container.innerHTML = '';
  const frag = document.createDocumentFragment();
  list.forEach(prod => {
    frag.appendChild(ProductCard(prod, { onToggleFavorite: handleFavToggled }));
  });
  container.appendChild(frag);
}

function handleFavToggled() {
  if (state.route === Routes.favorites) {
    renderFavorites();
  }
}

function renderProducts() {
  applyFilters();
  renderProductsList(state.filtered, els.productsGrid());
  els.productsEmpty().classList.toggle('hidden', state.filtered.length > 0);
}

function renderFavorites() {
  const favIds = new Set(Store.getFavorites());
  const favs = state.products.filter(p => favIds.has(p.id));
  renderProductsList(favs, els.favoritesGrid());
  els.favoritesEmpty().classList.toggle('hidden', favs.length > 0);
}

function updateView() {
  if (state.route === Routes.products) renderProducts();
  if (state.route === Routes.favorites) renderFavorites();
}

async function init() {
  // Theme
  Store.setTheme(Store.getTheme());

  // Router
  window.addEventListener('hashchange', setRouteFromHash);

  // UI handlers
  els.search().addEventListener('input', e => {
    state.filters.q = e.target.value;
    renderProducts();
  });
  els.category().addEventListener('change', e => {
    state.filters.category = e.target.value;
    renderProducts();
  });
  els.rating().addEventListener('change', e => {
    state.filters.minRating = e.target.value;
    renderProducts();
  });
  els.minPrice().addEventListener('change', e => {
    state.filters.minPrice = e.target.value;
    renderProducts();
  });
  els.maxPrice().addEventListener('change', e => {
    state.filters.maxPrice = e.target.value;
    renderProducts();
  });
  els.clearFilters().addEventListener('click', () => {
    state.filters = { q: '', category: '', minPrice: '', maxPrice: '', minRating: '' };
    els.search().value = '';
    els.category().value = '';
    els.rating().value = '';
    els.minPrice().value = '';
    els.maxPrice().value = '';
    renderProducts();
  });
  els.themeToggle().addEventListener('click', () => {
    Store.toggleTheme();
  });

  // Header first render
  renderHeader({ currentRoute: state.route });

  // Load data
  showLoader(true);
  try {
    const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);
    state.products = products;
    state.filtered = products;

    // Fill categories select
   // Preenche o select de categorias com tradução para português
const catSelect = els.category();

// Mapa de tradução das categorias
const traducaoCategorias = {
  "electronics": "Eletrônicos",
  "jewelery": "Joias",
  "men's clothing": "Roupas masculinas",
  "women's clothing": "Roupas femininas"
};

categories.forEach(categoria => {
  const opt = document.createElement('option');
  opt.value = categoria;
  opt.textContent = traducaoCategorias[categoria] || categoria;
  catSelect.appendChild(opt);
});

  } catch (err) {
    alert('Erro ao carregar dados: ' + err.message);
  } finally {
    showLoader(false);
  }

  setRouteFromHash();
}

init();
