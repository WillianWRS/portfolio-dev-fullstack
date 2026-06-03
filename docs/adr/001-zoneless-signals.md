# ADR 001 — Zoneless + Signals

## Status

Aceito (jun/2026)

## Contexto

O portfólio é uma SPA de página única com estado majoritariamente local e derivado de locale/conteúdo.

## Decisão

Adotar `provideZonelessChangeDetection()` com **signals**, `computed()` e `OnPush` em todos os componentes.

## Consequências

- Menos overhead de change detection e comportamento previsível.
- Efeitos visuais e locale devem usar APIs explícitas (`signal`, `effect`, `afterNextRender`) em vez de depender do Zone.js.
