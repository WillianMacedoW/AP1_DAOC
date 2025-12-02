# Loja React com Carrinho

Aplicação SPA em React que consome a **Fake Store API** e implementa catálogo, detalhes, carrinho global (Context API) e formulários de cadastro/edição com validação utilizando **TailwindCSS**.

## Funcionalidades
- Lista de produtos com imagem, preço, estoque e botão de detalhes.
- Página de detalhes com descrição, estoque e botão de adicionar ao carrinho respeitando o limite disponível.
- Carrinho global (Context API) com ajuste de quantidades, remoção e total geral.
- Formulários de cadastro e edição com validações (campos obrigatórios, preço/estoque ≥ 0) e foco automático no primeiro campo inválido via `useRef`.
- Rotas: `/`, `/produto/:id`, `/carrinho`, `/cadastro`, `/editar/:id` e página 404.

## Tecnologias
- React 18 via ES Modules (cdn `esm.sh`).
- React Router DOM 6 para navegação.
- Context API para o carrinho.
- TailwindCSS (CDN) para estilização.

## Como executar
Como o app usa módulos ES diretamente no navegador, basta subir um servidor estático simples:

```bash
python -m http.server 4173
# depois abra http://localhost:4173
```

Qualquer servidor estático funciona (Live Server, http-server, etc.).
