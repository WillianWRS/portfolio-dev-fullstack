# Revisão de Arquitetura — Portfolio Dev Fullstack

> Documento de avaliação técnica por arquiteto de software sênior.
> Objetivo: levar o projeto a um patamar **top tier** em arquitetura e melhores práticas com **Angular 21**.
> Status: **somente diagnóstico e plano** — nenhuma alteração de código foi feita.

---

## 1. Resumo executivo

O projeto já está **acima da média** para um portfólio. Usa Angular 21 com recursos modernos (standalone, signals, `inject()`, `input()`, OnPush, control flow `@if`), SSR + prerender, Tailwind, ESLint + CI e uma separação `core / shared / features` correta. A base é sólida.

Para alcançar o nível **top tier**, faltam principalmente: **lazy loading / `@defer`**, **consistência total das APIs modernas** (ainda há `@ViewChild` legado e `standalone: true` redundante), **estratégia de performance/Core Web Vitals** (o loader artificial atrapalha), **cobertura de testes real**, **path aliases**, **hardening do servidor SSR** e **melhorias de SEO/i18n dinâmico**.

| Dimensão | Nota atual | Potencial |
|---|---|---|
| Estrutura de pastas | 8.5 / 10 | 10 |
| Idiomas modernos Angular 21 | 7.5 / 10 | 10 |
| Performance / Core Web Vitals | 6 / 10 | 9.5 |
| Testes e qualidade | 5 / 10 | 9 |
| SSR / Servidor | 6.5 / 10 | 9 |
| SEO / Acessibilidade | 7.5 / 10 | 9.5 |
| Developer Experience (DX) | 7 / 10 | 9.5 |
| **Média geral** | **~6.9 / 10** | **~9.4 / 10** |

---

## 2. Pontos fortes (manter)

- **Componentes standalone + signals + OnPush** em quase todo o código.
- **`inject()` em vez de injeção por construtor**, alinhado ao style guide novo.
- **Convenção de nomes Angular 20+** (classes sem sufixo `Component`: `Home`, `Projects`, `Profile`).
- **Conteúdo, i18n e modelos desacoplados** em `core/content`, `core/i18n` e `core/models`.
- **`PortfolioContentService` reativo** via `computed()` que reage à troca de locale.
- **SSR + prerender** configurados corretamente (`provideClientHydration(withEventReplay())`).
- **Efeitos visuais inicializados com `afterNextRender`**, evitando problemas de hidratação.
- **Acessibilidade básica**: skip-link, `aria-*`, suporte a `prefers-reduced-motion`.
- **SEO inicial**: meta tags Open Graph/Twitter e JSON-LD (`schema.org/Person`).
- **CI** com lint + test + build e **TypeScript/templates em modo strict**.

---

## 3. Achados e recomendações

Prioridades: **P0** (alto impacto, fazer primeiro) · **P1** (importante) · **P2** (refino / nice-to-have).

---

### P0 — Performance e idiomas Angular 21

#### 3.1. Adotar `@defer` para seções abaixo da dobra
**Problema:** `Home` importa e renderiza **todas** as seções e os efeitos de fundo de uma vez (`home.ts` importa 10 componentes). Tudo entra no bundle inicial e é renderizado imediatamente.
**Recomendação:** usar blocos `@defer` (Angular 17+) com triggers `on viewport` / `on idle` para `Experience`, `Projects`, `Stacks`, `Testimonials`, `Contact`, `SiteFooter` e para os campos de partículas. Isso reduz JS inicial, melhora LCP/TBT e é uma das marcas registradas de uma app Angular moderna.
**Evidência:** `src/app/features/home/home.html`, `src/app/features/home/home.ts`.
**Esforço:** Médio.

#### 3.2. Repensar o "loading screen" artificial
**Problema:** `App` esconde todo o conteúdo por **1500 ms + 550 ms** atrás de um loader (`afterNextRender` + `setTimeout`). Com SSR/prerender o conteúdo já vem pronto no HTML, mas é mascarado — isso **degrada LCP e a percepção de velocidade** e desperdiça o benefício do SSR.
**Recomendação:** remover o atraso fixo ou trocar por uma transição puramente CSS sobre conteúdo já visível; se mantiver, reduzir drasticamente e nunca bloquear o LCP. Considerar `@angular/animations` ou apenas CSS.
**Evidência:** `src/app/app.ts` (`LOADING_DURATION_MS = 1500`).
**Esforço:** Baixo.

#### 3.3. Tornar o modo *zoneless* explícito
**Problema:** `app.config.ts` não declara `provideZonelessChangeDetection()` nem `provideZoneChangeDetection()`, e não há polyfill de zone.js em `angular.json`. O estado de change detection fica implícito/ambíguo.
**Recomendação:** como todo o app já usa signals + OnPush, adotar **zoneless explicitamente** com `provideZonelessChangeDetection()` no `appConfig`. É o padrão recomendado no Angular 21 e garante previsibilidade.
**Evidência:** `src/app/app.config.ts`, ausência de polyfills em `angular.json`.
**Esforço:** Baixo (validar com testes).

#### 3.4. Padronizar queries de view (remover `@ViewChild` legado)
**Problema:** mistura de APIs — `home.ts` usa `viewChild()` (signal query), mas `background-effects.ts` usa o decorator legado `@ViewChild(StarsField)`.
**Recomendação:** migrar tudo para `viewChild()` / `viewChildren()` (signal queries). Habilitar regra de lint para impedir regressão.
**Evidência:** `src/app/features/home/effects/background-effects/background-effects.ts` (linha 26).
**Esforço:** Baixo.

---

### P1 — Consistência, arquitetura e qualidade

#### 3.5. Remover `standalone: true` redundante
**Problema:** standalone é o padrão desde Angular 19. Alguns componentes declaram `standalone: true` (`home`, `projects`, `contact`, …) e outros omitem (`app.ts`, `loading-screen.ts`). Inconsistência.
**Recomendação:** remover `standalone: true` de todos os `@Component` e confiar no padrão; manter a regra `@angular-eslint/prefer-standalone`.
**Esforço:** Baixo.

#### 3.6. `LoadingScreen` sem `ChangeDetectionStrategy.OnPush`
**Problema:** é o único componente sem OnPush, quebrando o padrão do projeto.
**Recomendação:** adicionar `changeDetection: ChangeDetectionStrategy.OnPush`.
**Evidência:** `src/app/shared/loading-screen/loading-screen.ts`.
**Esforço:** Trivial.

#### 3.7. Reduzir o acoplamento imperativo entre `Home` e os efeitos
**Problema:** `Home.onMainClick()` chama `backgroundEffects()?.handleMainClick()`, que por sua vez chama `starsField?.spawnTriggeredMeteor()`. É uma cadeia imperativa pai→filho→neto, que conhece detalhes internos dos filhos.
**Recomendação:** introduzir um `EffectsCoordinatorService` (signal-based) ou usar `output()`/eventos. O `Home` emite "interação"; cada campo de efeito reage via `effect()`/`computed`. Isso desacopla e facilita testes.
**Evidência:** `home.ts`, `background-effects.ts`, `stars-field.ts`.
**Esforço:** Médio.

#### 3.8. Path aliases no TypeScript
**Problema:** imports profundos e frágeis como `../../../../core/services/locale.service`.
**Recomendação:** configurar `paths` no `tsconfig.json` (`@core/*`, `@shared/*`, `@features/*`) e refatorar imports. Melhora legibilidade, refatoração e onboarding.
**Evidência:** praticamente todos os componentes de seção.
**Esforço:** Médio (mudança ampla, mas mecânica).

#### 3.9. Cobertura de testes real
**Problema:** existem apenas 2 specs (`app.spec.ts` e `portfolio-content.spec.ts`). Componentes, serviços (`LocaleService`, `ClipboardService`, `PortfolioContentService`) e a factory de partículas não têm testes.
**Recomendação:**
- Testes unitários para serviços (locale persistido, troca de idioma, fallback de clipboard) e para `particle.factory`.
- Testes de componente para `Projects` (filtros, seleção, case study), `Profile` (copiar/revelar e-mail), `StackChip` (fallback de ícone).
- Adicionar **thresholds de cobertura** no Vitest e falhar o CI abaixo do limite.
- Considerar **Playwright** para 1–2 testes e2e (carregamento, troca de idioma, navegação por âncoras) e um teste de **acessibilidade** (axe).
**Esforço:** Alto.

#### 3.10. Hardening do servidor SSR (Express)
**Problema:** `server.ts` serve estáticos e renderiza, mas sem **compressão**, **headers de segurança** ou **logging**.
**Recomendação:** adicionar `compression`, headers de segurança (`helmet` ou headers manuais: CSP, `X-Content-Type-Options`, `Referrer-Policy`, HSTS), e cache headers consistentes. Avaliar se o deploy é Firebase Hosting puro (prerender) ou Node SSR, pois muda o que faz sentido aqui.
**Evidência:** `src/server.ts`, `firebase.json`.
**Esforço:** Baixo/Médio.

#### 3.11. Coerência da estratégia de deploy
**Problema:** coexistem `firebase.json` (hosting estático apontando para `dist/.../browser` com rewrite SPA para `index.html`) e SSR via Express (`outputMode: server`). O rewrite para `/index.html` ignora o SSR/prerender por rota.
**Recomendação:** decidir claramente entre (a) **prerender estático** (Firebase Hosting, mais simples e barato para portfólio) ou (b) **SSR dinâmico** (Cloud Functions/Run). Ajustar `angular.json` (`outputMode`), `firebase.json` e `server.ts` de forma coerente e documentar.
**Esforço:** Médio.

---

### P2 — Refino, DX e detalhes

#### 3.12. Endurecer regras de ESLint
**Recomendação:** adicionar regras como `@angular-eslint/prefer-signals`, `@angular-eslint/prefer-on-push-component-change-detection`, `@angular-eslint/use-lifecycle-interface`, `@typescript-eslint/consistent-type-imports` e regras de acessibilidade de template já existentes em `templateRecommended` (manter). Integrar Prettier ao ESLint (`eslint-config-prettier`) para evitar conflitos.
**Evidência:** `eslint.config.js`.

#### 3.13. Flags adicionais de TypeScript
**Recomendação:** ativar `noUnusedLocals`, `noUnusedParameters`, `forceConsistentCasingInFileNames` e `exactOptionalPropertyTypes`. Avaliar remover `experimentalDecorators` (não é mais necessário com o compilador Angular atual).
**Evidência:** `tsconfig.json`.

#### 3.14. Configuração via *injection token* / environments
**Problema:** URLs e dados (CV, calendário, repo, e-mail) ficam em `core/content`. Funciona, mas mistura "dados de conteúdo" com "configuração de ambiente".
**Recomendação:** extrair URLs externas/config para um `InjectionToken` (`APP_CONFIG`) ou `environments/`, facilitando troca por ambiente e testes.
**Evidência:** `core/content/profile.content.ts`.

#### 3.15. SEO dinâmico e i18n de metadados
**Problema:** `<title>` e meta description são estáticos em `index.html` e não mudam com o locale; o JSON-LD também é fixo.
**Recomendação:** usar `Title`/`Meta` services para atualizar título/descrição conforme o idioma e a rota; sincronizar com `LocaleService`. Localizar `og:description`.
**Evidência:** `src/index.html`, `locale.service.ts`.

#### 3.16. Acesso ao DOM via token `DOCUMENT`
**Problema:** `LocaleService` usa `document.documentElement.lang` diretamente.
**Recomendação:** injetar `DOCUMENT` do `@angular/common` (mais SSR-safe e testável) em vez de referenciar `document` global.
**Evidência:** `locale.service.ts` (linha 54).

#### 3.17. `@HostListener` → `host` ou listeners de signal
**Problema:** `stars-field.ts` usa `@HostListener('document:pointermove')`, que dispara muito e roda no documento inteiro.
**Recomendação:** considerar a propriedade `host` do `@Component` (consistente com o resto) e *throttling*/`requestAnimationFrame` para reduzir trabalho por evento. Avaliar `passive` listeners.
**Evidência:** `stars-field.ts` (linha 52).

#### 3.18. Centralizar "números mágicos" de efeitos
**Problema:** contagens e durações espalhadas (`55`, `7`, `6`, `80`, `3000`, etc.).
**Recomendação:** mover para constantes nomeadas em `core/effects` (ex.: `EFFECTS_CONFIG`), melhorando legibilidade e ajuste.
**Evidência:** `stars-field.ts`, `bubbles-field.ts`, `particle.factory.ts`.

#### 3.19. Click handler em região grande (`<main>`)
**Problema:** `(click)="onMainClick()"` no `<main>` inteiro para disparar meteoro pode interferir com interações e não é semântico.
**Recomendação:** restringir a área/intenção do gesto ou documentar como "easter egg" intencional; garantir que não capture cliques de links/botões de forma indevida.
**Evidência:** `home.html` (linha 3).

#### 3.20. PWA / ativos de SEO
**Recomendação (nice-to-have):** adicionar `robots.txt`, `sitemap.xml`, `manifest.webmanifest` e, opcionalmente, `@angular/service-worker` para cache/offline. Para um portfólio, eleva a percepção de qualidade técnica.

#### 3.21. README e documentação de arquitetura
**Recomendação:** expandir o README com diagrama de camadas, decisões de arquitetura (ADRs leves) e guia de contribuição. Documentar a escolha SSR vs prerender (ver 3.11).

---

## 4. Roadmap sugerido (por fases)

### Fase 1 — Modernização e performance (P0) — ✅ CONCLUÍDA
1. ✅ Zoneless explícito (`provideZonelessChangeDetection`).
2. ✅ Loader artificial → cortina puramente CSS, sem timers e sem bloquear o conteúdo/LCP.
3. ✅ `@defer (hydrate on viewport)` nas seções abaixo da dobra (hidratação incremental: conteúdo no SSR, JS adiado) e `@defer (on idle)` nos efeitos de fundo.
4. ✅ `viewChild()` padronizado (removido o `@ViewChild` legado em `background-effects.ts`).

> Validação: `npm run lint`, `npm run build` (prerender) e dev server verdes. Chunks lazy gerados por seção; `__nghDeferData__` confirma SSR + hidratação incremental.

### Fase 2 — Consistência e estrutura (P1)
5. Remover `standalone: true` redundante e adicionar OnPush em `LoadingScreen`.
6. Path aliases (`@core`, `@shared`, `@features`).
7. Desacoplar coordenação de efeitos (serviço/sinais).
8. Definir e alinhar estratégia de deploy (SSR vs prerender) + hardening do Express.

### Fase 3 — Qualidade e confiabilidade (P1)
9. Suite de testes unitários de serviços e componentes + thresholds de cobertura no CI.
10. Testes e2e + acessibilidade (Playwright + axe).

### Fase 4 — Refino e DX (P2)
11. Regras de ESLint mais rígidas + flags de TS.
12. `APP_CONFIG` / environments e SEO dinâmico (`Title`/`Meta`).
13. `DOCUMENT` token, centralização de constantes de efeitos, throttling de eventos.
14. PWA, sitemap/robots/manifest e documentação/ADRs.

---

## 5. Checklist de "top tier" (estado-alvo)

- [x] Zoneless explícito.
- [x] `@defer` cobrindo conteúdo abaixo da dobra; bundle inicial enxuto.
- [x] Sem loader artificial bloqueando o LCP.
- [x] 100% das queries em signal queries (`viewChild`/`viewChildren`).
- [ ] Sem `standalone: true` redundante; OnPush em todos os componentes.
- [ ] Path aliases configurados e imports limpos.
- [ ] Coordenação de efeitos desacoplada via serviço/sinais.
- [ ] Cobertura de testes com thresholds no CI + e2e/a11y.
- [ ] Estratégia de deploy única e coerente; Express com compressão e headers de segurança.
- [ ] SEO dinâmico/localizado + sitemap/robots/manifest.
- [ ] ESLint/TS endurecidos; Prettier integrado.
- [ ] README com arquitetura e ADRs.

---

## 6. Observação final

Nenhuma mudança de código foi aplicada — este documento é apenas o **plano**. Quando você aprovar, recomendo executar **fase a fase**, com o CI verde a cada etapa, para garantir que cada melhoria seja segura e reversível. Posso começar pela **Fase 1** assim que você der o comando.
