# ADR 003 — Hidratação incremental com `@defer`

## Status

Aceito (jun/2026)

## Contexto

Todas as seções no bundle inicial aumentavam JS parse/execute e TBT, apesar do conteúdo estar abaixo da dobra.

## Decisão

- `provideClientHydration(withIncrementalHydration())`.
- Seções abaixo da dobra: `@defer (hydrate on viewport)` com placeholders que preservam `id` de âncoras.
- Efeitos de fundo: `@defer (on idle)`.

## Consequências

- Chunks lazy por seção; bundle inicial menor.
- Navegação `#about`, `#projects`, etc. continua funcionando no HTML pré-renderizado.
- Placeholders reservam espaço apenas no cenário client-only (sem prerender).
