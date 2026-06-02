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
| `npm run lint` | ESLint (TypeScript + templates) |
| `npm run icons:sync` | Baixa ícones de stack para `public/icons/stacks/` |

## Qualidade

- TypeScript e templates em modo **strict**
- CI em `.github/workflows/ci.yml` (lint, test, build)
- Conteúdo e traduções desacoplados do componente `Home`
- Efeitos visuais inicializados no cliente (`afterNextRender`) para evitar problemas de hidratação
- Locale persistido em `localStorage` (`portfolio.locale`)

## SSR

```bash
npm run build
npm run serve:ssr:portfolio-dev-fullstack
```
