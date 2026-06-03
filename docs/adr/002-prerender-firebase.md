# ADR 002 — Prerender estático no Firebase Hosting

## Status

Aceito (jun/2026)

## Contexto

O site tem uma única rota pública. SSR dinâmico adiciona complexidade operacional sem benefício proporcional.

## Decisão

- Build com `outputMode: server` + `RenderMode.Prerender` para gerar HTML estático em `dist/.../browser`.
- Deploy principal via **Firebase Hosting** (rewrite SPA para `index.html`).
- Servidor Express (`server.ts`) mantido como caminho opcional para SSR dinâmico (Cloud Run/Functions).

## Consequências

- SEO e LCP favorecidos pelo HTML pré-renderizado.
- Headers de cache/segurança configurados em `firebase.json`.
- `@defer (hydrate on viewport)` adia hidratação JS sem remover conteúdo do HTML SSR.
