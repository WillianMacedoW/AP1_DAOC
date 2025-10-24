# FakeStore SPA — Vanilla JS

Single Page Application em **JavaScript Vanilla** que consome a **Fake Store API**, exibe produtos em **cards componentizados**, permite **favoritar** itens com persistência em `localStorage`, inclui **filtros** (nome, categoria, preço, avaliação), **tema claro/escuro**, **roteamento por hash** e **layout responsivo**.

## 🔧 Tecnologias e práticas
- JavaScript puro (sem frameworks)
- ES Modules (componentização)
- Fetch API
- localStorage (favoritos + tema)
- SPA com hash routing (`#/products` e `#/favorites`)
- Responsivo + indicador de carregamento

## 📦 Estrutura
```
fakestore-spa/
├── index.html
├── styles.css
└── src/
    ├── app.js
    ├── api.js
    ├── store.js
    └── components/
        ├── Header.js
        └── ProductCard.js
```

## ▶️ Executando localmente
Como o projeto usa **ES Modules**, é necessário rodar com um **servidor HTTP** local (arquivos `file://` podem bloquear módulos por CORS).

### Opção A — Python (3.x)
```bash
cd fakestore-spa
python -m http.server 5173
# Abra: http://localhost:5173
```

### Opção B — Node (http-server)
```bash
npm i -g http-server
http-server -p 5173
# Abra: http://localhost:5173
```

> Dica: Em VS Code, a extensão *Live Server* também funciona.

## 🧭 Rotas (SPA)
- `#/products` — lista de produtos + filtros
- `#/favorites` — itens favoritados

## ⭐ Favoritos
- Clique no coração do card para favoritar/desfavoritar.
- Persistência em `localStorage` (chave `fs:favorites`).

## 🎨 Tema claro/escuro
- Botão 🌓 alterna o tema e salva em `localStorage` (chave `fs:theme`).

## 🧪 O que foi implementado
- [x] Vanilla JS + ES Modules
- [x] Fetch API (produtos + categorias)
- [x] SPA (hash routing, sem recarregar a página)
- [x] Card + Header como componentes
- [x] Favoritos persistentes
- [x] Filtro por nome (obrigatório)
- [x] Filtro por categoria (bônus)
- [x] Filtro por preço (bônus)
- [x] Filtro por avaliação (bônus)
- [x] Tema claro/escuro (bônus)
- [x] Responsivo + loader

## 📝 Notas
- A Fake Store API é pública: https://fakestoreapi.com/
- Em produção, considere tratar erros por produto e melhorar acessibilidade das notas/estrelas.

## 📄 Licença
MIT
