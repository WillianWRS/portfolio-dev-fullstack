# Sugestões de UX/UI — Portfolio Dev Fullstack

> Análise realizada em junho/2026 com base na estrutura atual do projeto Angular 21, templates, estilos, fluxos de navegação, i18n e testes de acessibilidade.

---

## Resumo executivo

O portfólio apresenta uma **identidade visual madura e coesa**: fundo escuro premium (`zinc-950`), cards claros flutuantes, tipografia editorial (Fraunces + Plus Jakarta Sans) e micro-interações de alto nível no hero e na seção de projetos. A arquitetura de conteúdo segue um **storytelling linear eficaz** — identidade → projetos → experiência → stacks → prova social → contato.

As maiores oportunidades de melhoria estão em **navegação mobile**, **consistência de interação em touch**, **completude de features já planejadas** (modo recrutador, seletor de efeitos) e **refinamento de feedback visual** em ações críticas de conversão.

---

## O que já funciona bem

| Área | Observação |
|------|------------|
| Identidade visual | Contraste dark/light bem resolvido; cards brancos criam hierarquia clara sobre o fundo |
| Tipografia | Combinação display + sans + mono transmite profissionalismo técnico sem parecer genérico |
| Hero (Profile) | CTAs claros, bio escaneável, foto com interação memorável |
| Seção Projects | Filtros, tabs ARIA, métricas, case study — nível acima da média em portfólios pessoais |
| Performance percebida | `@defer` com placeholders, loading screen não bloqueia LCP, ícones lazy |
| Acessibilidade base | Skip link, landmarks semânticos, `prefers-reduced-motion`, axe no CI |
| i18n | Solução tipada e reativa; conteúdo longo bilíngue em `core/content/` |
| Anti-scraping | Email ofuscado no profile com reveal + copy — boa prática de privacidade |

---

## Priorização das sugestões

### 🔴 Crítico — impacto alto, esforço moderado

#### 1. Navegação ausente em mobile e tablet

**Problema:** O `<nav>` principal fica `hidden` até `lg` (1024px). Em telas menores, o visitante só tem logo, toggle de idioma e scroll manual — sem acesso rápido a Experiência, Stacks ou Contato.

**Arquivo:** `src/app/features/home/sections/site-header/site-header.html`

**Sugestão:**
- Adicionar menu hamburger ou botão "Seções" visível abaixo de `lg`
- Drawer ou bottom sheet com os mesmos itens do nav desktop
- Manter o padrão visual atual (pill, glassmorphism, bordas `zinc-300/80`)
- Incluir **Depoimentos** (`#testimonials`) no menu — existe na página, mas não no nav

**Impacto UX:** Reduz fricção de descoberta; visitantes mobile (maioria do tráfego em portfólios) conseguem navegar com intenção.

---

#### 2. Overlay de descrição do projeto inacessível em touch

**Problema:** A descrição do projeto selecionado só aparece no `group-hover` da imagem. Em dispositivos touch não há hover — o usuário pode nunca ver o texto.

**Arquivo:** `src/app/features/home/sections/projects/projects.html` (`.project-showcase__overlay`)

**Sugestão (escolher uma ou combinar):**
- Exibir a descrição **sempre visível** abaixo da imagem (recomendado para clareza)
- Ou: overlay semi-transparente permanente com texto legível
- Ou: botão "Ver descrição" que expande o texto no mobile (`@media (hover: none)`)

**Impacto UX:** Garante paridade de informação entre desktop e mobile.

---

#### 3. Modal de case study sem gerenciamento de foco

**Problema:** O dialog tem `role="dialog"` e fecha com Escape, mas falta focus trap, retorno de foco ao elemento que abriu e anúncio para leitores de tela.

**Arquivo:** `src/app/features/home/sections/projects/projects.html` / `projects.ts`

**Sugestão:**
- Implementar focus trap (primeiro/último tab cicla dentro do modal)
- Ao fechar, devolver foco ao botão "Ver case study"
- Adicionar `aria-labelledby` apontando para o título do case
- Considerar `cdkTrapFocus` ou diretiva custom equivalente

**Impacto UX:** Conformidade WCAG 2.4.3 e experiência segura para usuários de teclado e screen readers.

---

### 🟠 Alto — melhoria significativa de experiência

#### 4. Largura fixa `w-[70%]` em todas as viewports

**Problema:** Em telas estreitas (~320–400px), 70% da viewport + `px-6` comprime bastante o conteúdo. Cards e filtros de projetos ficam apertados.

**Arquivo:** `src/app/features/home/home.html`

**Sugestão:**
```html
<!-- De: -->
class="mx-auto w-[70%] px-6 md:px-8"

<!-- Para algo como: -->
class="mx-auto w-full max-w-6xl px-6 md:px-8 lg:w-[85%] xl:w-[70%]"
```

**Impacto UX:** Melhor legibilidade em mobile sem perder o layout centrado em desktop.

---

#### 5. Feedback de "email copiado" sem confirmação acessível

**Problema:** O ícone muda para check por 2s, mas não há `aria-live` nem texto para leitores de tela.

**Arquivo:** `src/app/features/home/sections/profile/profile.html`

**Sugestão:**
- Adicionar região `aria-live="polite"` com mensagem traduzida (`email.copied` — nova chave i18n)
- Toast discreto opcional no canto inferior (3s, dismiss automático)
- Tratar falha de clipboard com feedback visual (hoje é silencioso)

---

#### 6. Inconsistências de i18n em textos de acessibilidade

**Problema:** Alguns strings estão hardcoded em português ou inglês:

| Local | Texto fixo |
|-------|------------|
| `loading-screen.html` | "Carregando portfólio", "Carregando" |
| `projects.html` | `aria-label="Tecnologias do projeto"` |
| `site-footer.html` | `aria-label="Social links"` |

**Sugestão:** Criar chaves em `translations.ts` (`loading.aria`, `projects.stacksAria`, `footer.socialAria`) e injetar `LocaleService` onde necessário.

---

#### 7. Seção About removida — lacuna na narrativa

**Problema:** A seção About foi absorvida pela bio do Profile, mas visitantes que buscam uma seção dedicada "Sobre mim" (padrão em portfólios) não encontram âncora nem bloco visual separado.

**Sugestão (escolher abordagem):**
- **Opção A:** Manter bio no hero e adicionar sub-seção "Destaques" (3 bullets de valor) abaixo dos CTAs
- **Opção B:** Restaurar card About leve entre Profile e Projects com conteúdo complementar (não duplicar a bio)
- **Opção C:** Renomear mentalmente o hero para "Sobre" e ajustar copy do headline para deixar claro que ali está a apresentação completa

---

#### 8. Conteúdo placeholder reduz credibilidade

**Problema:** README admite que projetos, experiência e depoimentos estão em evolução. Visualmente as seções estão prontas, mas conteúdo genérico enfraquece a prova social e o impacto dos CTAs.

**Sugestão de conteúdo (UX writing):**
- Priorizar **2–3 projetos reais** com métricas verdadeiras antes de publicar
- Depoimentos: mesmo 1 citação real com foto/nome/cargo supera 3 placeholders
- Experiência: datas e empresas reais; badge "Atual" já está bem implementado
- Enquanto placeholder: considerar estado visual "Em breve" mais explícito (não só texto pequeno)

---

### 🟡 Médio — refinamento e polish

#### 9. Features planejadas mas não implementadas

**Problema:** Chaves i18n existem para funcionalidades sem UI:

- `recruiter.modeOn` / `recruiter.modeOff` / `recruiter.toggleAria`
- `effect.bubble` / `effect.sky` / `effect.pulse` / `effects.toggleAria`
- Componentes `BubblesField` e `PulseField` implementados, mas home usa só `stars`

**Sugestão:**
- **Modo recrutador:** Toggle no header que simplifica a página (esconde efeitos, prioriza CV/contato/calendário, reordena seções)
- **Seletor de efeitos:** Controle discreto no footer ou header (ícone sparkle) — respeitar `prefers-reduced-motion` como default off
- Remover chaves órfãs se não houver plano de implementar em curto prazo (evita dívida de documentação)

---

#### 10. Design system sem tokens centralizados

**Problema:** Cores e espaçamentos estão espalhados entre classes Tailwind e valores RGB em SCSS (`home.scss`, `profile.scss`). Funciona hoje, mas dificulta evolução consistente.

**Sugestão:**
- Estender `tailwind.config.js` com tokens semânticos:

```js
colors: {
  surface: { dark: '#09090b', card: '#fafafa' },
  accent: { primary: '#18181b' }, // zinc-900 para CTAs escuros
}
```

- Documentar em comentário no `styles.scss` os 5–6 padrões reutilizáveis (`.section-card`, `.profile-cta`, etc.)
- Corrigir CSS órfão: `.section-card__icon-wrap` usado em `stacks.html` sem definição

---

#### 11. Hierarquia visual entre seções similares

**Problema:** Todas as seções usam o mesmo `.section-card` com padding e border-radius idênticos. Projetos — a seção mais importante após o hero — não se destaca visualmente das demais.

**Sugestão:**
- Projects: card levemente maior (`padding` extra) ou borda sutil com accent
- Contact: tratamento mais "conversão" — CTA primário maior, cor de destaque discreta (ex.: emerald-600 no botão de calendário)
- Testimonials: aspas decorativas ou avatar placeholder para humanizar antes de fotos reais

---

#### 12. Nav desktop não reflete ordem da página

**Problema:** Ordem no scroll: Profile → Projects → Experience → Stacks → Testimonials → Contact. Nav: Projects → Experience → Stacks → Contact (ok), mas **Testimonials ausente**.

**Sugestão:** Alinhar nav com a ordem real da página e incluir Depoimentos, ou manter nav enxuto e adicionar link "Depoimentos" apenas no footer.

---

#### 13. Loading screen — oportunidade de brand moment

**Problema:** Animação WRS é elegante, mas dura ~2.1s fixos para todos os usuários, inclusive em conexões rápidas com prerender.

**Sugestão:**
- Reduzir para ~1.2s ou sincronizar com `document.readyState`
- Adicionar opção "Pular" após 0.8s (acessível, foco visível)
- Internacionalizar textos
- Respeitar `prefers-reduced-motion`: fade simples sem stroke animation

---

#### 14. Contato — múltiplos caminhos, hierarquia igual

**Problema:** Email, Cal.com e CV têm peso visual equivalente nos 3 cards. Para um portfólio de dev, o caminho preferido (calendário vs email) não está guiado.

**Arquivo:** `src/app/features/home/sections/contact/contact.html`

**Sugestão:**
- Destacar **Cal.com** como CTA primário (agendamento = menor fricção que email)
- Email como secundário; CV como terciário
- Adicionar indicação de tempo de resposta (`contact.availability` já existe em i18n — garantir destaque visual)

---

### 🟢 Baixo — nice to have

#### 15. Indicador de progresso de scroll

Sutil barra ou dots laterais mostrando em qual seção o usuário está. Útil especialmente sem nav mobile. Implementação leve com `IntersectionObserver`.

#### 16. Animação de entrada do hero

O profile aparece imediatamente após o loading. Um fade-in coordenado (nome → headline → CTAs) reforçaria o momento de primeira impressão — com fallback `motion-reduce`.

#### 17. Stacks — legenda de proficiência mais explícita

Os badges PRO/FAM/NEW nos chips são bons, mas visitantes não técnicos podem não entender. Adicionar legenda compacta abaixo do subtítulo da seção.

#### 18. Footer — reforço de conversão

O footer é discreto (correto), mas poderia repetir um micro-CTA "Vamos conversar?" linkando para `#contact`.

#### 19. Open Graph / preview social

Já existe `SeoService` — validar se a imagem OG comunica a identidade visual (não apenas screenshot genérico). Impacta CTR quando o link é compartilhado no LinkedIn.

#### 20. Easter egg do meteoro

Clicar no fundo dispara meteoro — charmoso, mas sem affordance. Se quiser manter, um tooltip sutil na primeira visita (localStorage flag) pode aumentar descoberta sem poluir.

---

## Sugestões por seção

### Profile (Hero)

| Atual | Sugestão |
|-------|----------|
| Bio longa em parágrafo único | Considerar 2 parágrafos curtos ou 3 bullets de valor abaixo da bio |
| CTAs lado a lado | Em mobile, garantir largura mínima de toque 44×44px (verificar `profile-cta`) |
| Foto com muitos efeitos | Em `prefers-reduced-motion`, já reduz scale — validar se borda animada também para |
| Redes sociais em linha | Ordenar por relevância profissional (LinkedIn → GitHub → Email) |

### Projects

| Atual | Sugestão |
|-------|----------|
| Tabs verticais à direita em desktop | Em tablet (`md`), considerar tabs horizontais scrolláveis |
| Filtros como pills | Adicionar contagem por filtro `(3)` quando houver projetos reais |
| Métricas em grid 3 colunas | Em mobile estreito, empilhar ou usar 2 colunas |
| Case study modal | Adicionar imagem ou diagrama no modal para quebrar blocos de texto |

### Experience

| Atual | Sugestão |
|-------|----------|
| Timeline vertical clara | Adicionar logos das empresas (mesmo monocromáticos) para escaneabilidade |
| Texto de responsabilidades | Limitar a 3–4 bullets por role; link "Ver mais" se necessário |

### Stacks

| Atual | Sugestão |
|-------|----------|
| Categorias com dots coloridos | Boa distinção — adicionar ícone por categoria além do dot |
| Chips com proficiência | Tooltip no hover já usa `title` — replicar info em mobile com tap |

### Testimonials

| Atual | Sugestão |
|-------|----------|
| Grid 3 colunas em `md+` | Com 1–2 depoimentos reais, usar layout assimétrico ou carrossel |
| Blockquote sem avatar | Placeholder com iniciais até foto real |

### Contact

| Atual | Sugestão |
|-------|----------|
| Sem formulário | Aceitável para portfólio — calendário é o caminho de menor fricção |
| Email exposto diretamente | Consistente com profile (lá é ofuscado) — alinhar estratégia |

---

## Acessibilidade — checklist de melhorias

- [ ] Nav mobile com `aria-expanded` e foco gerenciado no drawer
- [ ] Focus trap no modal de case study
- [ ] `aria-live` no copy de email
- [ ] Internacionalizar todos `aria-label` e textos `sr-only`
- [ ] Revisar contraste de `text-zinc-400` sobre `zinc-950` (WCAG AA para textos pequenos)
- [ ] Garantir área de toque mínima 44×44px em todos os botões/icon buttons
- [ ] Adicionar `cite` ou atribuição estruturada nos depoimentos (`<figure>` + `<figcaption>`)
- [ ] Testar fluxo completo só com teclado (Tab, Enter, Escape) em Projects

---

## Responsividade — breakpoints sugeridos

| Viewport | Ajuste recomendado |
|----------|-------------------|
| `< 640px` | Container `w-full`; nav mobile; descrição de projeto sempre visível |
| `640–1023px` | Tabs de projetos horizontais; grids 2 colunas onde couber |
| `≥ 1024px` | Nav central atual; layout 2 colunas em Projects |
| `≥ 1280px` | Manter `max-w-6xl` ou `w-[70%]` para leitura confortável |

---

## Métricas sugeridas para validar melhorias

Após implementar as mudanças críticas, medir:

1. **Scroll depth** — % de visitantes que chegam em Contact
2. **CTR dos CTAs** — "Ver projetos", "Baixar CV", link Cal.com
3. **Taxa de abertura do case study** — interesse nos projetos
4. **Bounce rate mobile vs desktop** — indicador direto do gap de navegação
5. **axe / Lighthouse Accessibility** — manter score ≥ 95

---

## Roadmap sugerido

### Sprint 1 — Fundação mobile e a11y
1. Menu mobile / drawer de navegação
2. Descrição de projeto visível em touch
3. Focus trap no modal
4. i18n dos textos de acessibilidade

### Sprint 2 — Layout e conversão
5. Container responsivo (`max-w` + breakpoints)
6. Hierarquia de CTAs em Contact
7. Feedback acessível no copy de email
8. Ajuste do loading screen

### Sprint 3 — Conteúdo e polish
9. Substituir placeholders por conteúdo real
10. Modo recrutador (se alinhado com objetivo)
11. Tokens de design no Tailwind
12. Destaque visual da seção Projects

---

## Conclusão

O projeto já está **acima da média** em identidade visual, arquitetura técnica e preocupação com acessibilidade automatizada. As sugestões acima não pedem uma reformulação visual — pedem **fechar lacunas de usabilidade** (especialmente mobile), **alinhar interação com intenção do visitante** (recrutador, contato, projetos) e **substituir conteúdo placeholder** para que o design premium seja sustentado por narrativa igualmente forte.

A ordem de prioridade recomendada: **navegação mobile → overlay de projetos em touch → modal acessível → conteúdo real → refinamentos visuais**.

---

*Documento gerado para apoio à evolução do portfólio. Atualizar conforme implementações forem concluídas.*
