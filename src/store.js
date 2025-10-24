// src/store.js
const FAVORITES_KEY = 'fs:favorites';
const THEME_KEY = 'fs:theme';

export const Store = {
  getFavorites() {
    try { return JSON.parse(localStorage.getItem(FAVORITES_KEY)) ?? []; }
    catch { return []; }
  },
  setFavorites(ids) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  },
  toggleFavorite(id) {
    const ids = new Set(this.getFavorites());
    ids.has(id) ? ids.delete(id) : ids.add(id);
    const next = [...ids];
    this.setFavorites(next);
    return next;
  },
  isFavorite(id) {
    return this.getFavorites().includes(id);
  },
  getTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
  },
  setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  },
  toggleTheme() {
    const next = this.getTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(next);
    return next;
  }
};
