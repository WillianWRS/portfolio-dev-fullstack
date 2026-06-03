# Portfolio Dev Fullstack

Portfólio pessoal em **Angular 21** com **SSR/prerender**, **Tailwind CSS** e **Signals**.

## Estrutura

```
src/app/
├── core/           # modelos, conteúdo estático, i18n, serviços
├── shared/ui/      # componentes reutilizáveis (ícones, chips)
└── features/home/  # página principal, seções e efeitos de fundo
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm start` | Servidor de desenvolvimento |
| `npm run build` | Build de produção com SSR |
| `npm test` | Testes unitários (Vitest) |
| `npm run test:ci` | Testes + cobertura + thresholds (CI) |
| `npm run e2e` | Testes e2e e acessibilidade (Playwright + axe) |
| `npm run lint` | ESLint (TypeScript + templates) |
| `npm run icons:sync` | Baixa ícones de stack para `public/icons/stacks/` |

## Qualidade

- TypeScript e templates em modo **strict**
- CI em `.github/workflows/ci.yml` (lint, testes com cobertura, build, e2e + axe)
- Cobertura mínima configurada em `angular.json` (`test:ci`)
- E2E: `e2e/home.spec.ts` (idioma, navegação) e `e2e/accessibility.spec.ts` (WCAG via axe)
- Conteúdo e traduções desacoplados do componente `Home`
- Efeitos visuais inicializados no cliente (`afterNextRender`) para evitar problemas de hidratação
- Locale persistido em `localStorage` (`portfolio.locale`)

## SSR / Deploy

O alvo principal é **prerender estático no Firebase Hosting**: `npm run build` gera o
`index.html` pré-renderizado em `dist/portfolio-dev-fullstack/browser`, servido pelo Firebase
(headers de cache/segurança em `firebase.json`). As seções abaixo da dobra usam
`@defer (hydrate on viewport)` (hidratação incremental: conteúdo no SSR, JS adiado).

Servidor Node/Express (`server.ts`) é um caminho **opcional** de SSR dinâmico, com
`compression` e headers de segurança:

```bash
npm run build
npm run serve:ssr:portfolio-dev-fullstack
```
