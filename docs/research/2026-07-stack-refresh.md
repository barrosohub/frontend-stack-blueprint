# Pesquisa de atualização do stack — 30/07/2026

## Escopo e método

Esta revisão confronta o estado declarado na versão `1.9.0` do blueprint
(`stack.yaml`, `guides/package-versions.md`, templates, racionales, backlog e
targets) com documentação, release notes, especificações e registros oficiais
disponíveis em 30 de julho de 2026. Não foram usadas fontes secundárias para
fundamentar as conclusões.

O resultado exige um **major release** do blueprint. TypeScript 7, Vite 8,
Prisma 7, pnpm 11 e ESLint 10 mudam contratos ou configurações; shadcn/ui mudou
sua base padrão; Temporal avançou para Stage 4; e Workers Static Assets tornou
incompleta a preferência incondicional por Cloudflare Pages.

## Resumo executivo

| Área         | Estado declarado                                   | Estado oficial em 30/07/2026                                                                           | Decisão recomendada                                                                                       |
| ------------ | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| TypeScript   | `5.9.3`, `>=5.9`; template com `baseUrl`           | TypeScript 7.0 estável; `baseUrl` foi depreciado no 6 e removido do caminho do 7                       | TypeScript 7 como padrão; retirar `baseUrl`; oferecer trilha 5.9 → 6 → 7                                  |
| React        | React `19.2.4`; Compiler “em avaliação”            | React 19.2 permanece a linha documentada; Compiler 1.0 é estável desde 07/10/2025                      | Manter React 19.2; promover Compiler a opt-in estável e incremental                                       |
| Vite         | `7.3.1`, produção “Rollup-based”                   | Vite 8.1; Rolldown unifica dev/build; plugin React 6 usa Oxc                                           | Migrar para Vite 8.1 e `@vitejs/plugin-react` 6                                                           |
| Node / pnpm  | Node `>=20.19                                      |                                                                                                        | >=22.12`; Corepack presumido                                                                              | Node 20 EOL; Node 24 e 22 LTS; pnpm 11 exige Node 22+; Corepack não vem no Node 25+ | Node 24 LTS padrão, 22 LTS mínimo; pnpm 11 fixado; Corepack condicional |
| Testes       | Vitest `>=3.2`, 4 recomendado; Playwright `1.61.1` | Vitest 4.1 é a linha atual documentada; Playwright 1.61 é a linha atual documentada                    | Elevar Vitest para 4.1; manter Playwright 1.61                                                            |
| Lint/format  | ESLint + Prettier; Biome em avaliação              | ESLint 10.8; `eslintrc` removido no 10; Biome 2.4 tem lint type-aware, plugins e análise multi-arquivo | Atualizar ESLint para 10; avaliar Biome por perfil, sem substituição automática                           |
| UI           | Radix é core; shadcn = “Radix + Tailwind”          | Base UI é o default do shadcn; Radix continua suportado; React Aria é first-class                      | Base UI como default novo; base explícita no CLI; Radix/Aria como alternativas                            |
| Tailwind     | `>=4`                                              | Tailwind 4.3; configuração CSS-first e plugin Vite first-party                                         | Fixar linha 4.3 e eliminar templates JS herdados quando desnecessários                                    |
| ORM          | Prisma 6.18; Drizzle aguardando v1 GA              | Prisma 7 é produção; Prisma Next/8 é Early Access; Drizzle 1.0 ainda beta                              | Prisma 7 como default; não adotar Prisma Next/8 nem Drizzle beta como core                                |
| Estado/dados | Zustand; Query 5; Store v0 aguardando v1           | Query continua v5; Store continua v0; Zustand segue mantido                                            | Manter Zustand + Query 5; manter Store em avaliação                                                       |
| Datas        | date-fns 4; Temporal “Stage 3”                     | Temporal é Stage 4; Firefox 139, Chrome 144 e Node 26 já enviam, Safari está pendente                  | Corrigir status; manter date-fns por compatibilidade, permitir Temporal por profile                       |
| Cloudflare   | Pages é alvo cloud prioritário                     | Pages continua disponível, mas Cloudflare fornece Workers Static Assets e guia Pages → Workers         | Workers Static Assets como default Cloudflare para novos projetos; Pages para Git workflow simples/legado |
| Source maps  | `sourcemap: true` universal, “required for Sentry” | Vite usa `false` por padrão; Sentry recomenda upload no build e permite apagar mapas após upload       | `false` por padrão; `hidden` + upload privado + remoção quando Sentry estiver ativo                       |

## 1. TypeScript

### Constatações

- O blueprint fixa TypeScript 5.9.3, mas o [TypeScript 7.0 foi lançado como
  estável em 08/07/2026](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
  É o port nativo em Go e o anúncio oficial reporta desempenho tipicamente cerca
  de dez vezes superior.
- TypeScript 6 foi explicitamente uma ponte de migração entre 5.9 e 7. A
  documentação oficial marca `baseUrl` como depreciado, explica que `paths` não
  precisa dele e recomenda removê-lo quando os mapeamentos já têm prefixos
  explícitos. Também incorporou `DOM.Iterable` a `DOM`, tornando essa entrada
  redundante no template. Ver [release notes do TypeScript
  6.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html).
- O template `templates/tsconfig.json.md` contém exatamente o caso obsoleto:
  `"baseUrl": "."` com `"@/*": ["./src/*"]`.

### Ação

1. Definir TypeScript `>=7.0.0` como baseline de novos projetos.
2. Remover `baseUrl` e `DOM.Iterable` do template.
3. Preservar `moduleResolution: "bundler"` para Vite.
4. Documentar migração passando primeiro pelo TypeScript 6 e corrigindo todas as
   depreciações antes de ativar o 7.
5. Validar separadamente ferramentas que importam a API programática do
   TypeScript; não tratar a troca do compilador nativo como mero bump de patch.

## 2. React, React Compiler e Error Boundaries

### Constatações

- A documentação oficial continua identificando
  [React 19.2](https://react.dev/blog/2025/10/01/react-19-2) como a versão
  corrente da linha React; não há evidência oficial para substituir o baseline
  `19.2`.
- [React Compiler 1.0](https://react.dev/blog/2025/10/07/react-compiler-1) é
  estável, production-ready e publicado desde 07/10/2025. Portanto, o blocker
  “Stability in production” e a ETA “Q2 2026” do backlog estão vencidos.
- O time do React recomenda
  [adoção incremental](https://react.dev/learn/react-compiler/incremental-adoption):
  por diretório, diretiva `"use memo"` ou runtime gating, com verificação de
  comportamento e medição.
- A regra absoluta “functional components only — no class components, ever”
  conflita com a documentação do React: [ainda não há Error Boundary nativo
  escrito como function component](https://react.dev/reference/react/Component).

### Ação

- Manter React `>=19.2`.
- Retirar React Compiler do backlog de “aguardando estabilidade” e torná-lo uma
  capacidade **opt-in estável**, ativada incrementalmente e medida.
- Não afirmar que o Compiler “elimina” todo `useMemo`/`useCallback`; esses hooks
  ainda podem ser necessários para contratos de identidade referencial e
  integração externa.
- Permitir classes somente na infraestrutura de Error Boundary, ou recomendar
  uma abstração mantida como `react-error-boundary`.

## 3. Vite e `@vitejs/plugin-react`

### Constatações

- [Vite 8](https://vite.dev/blog/announcing-vite8) está estável desde
  12/03/2026 e substituiu o par esbuild/Rollup por Rolldown como bundler
  unificado. A descrição “Rollup-based production builds” ficou incorreta.
- [Vite 8.1](https://vite.dev/blog/announcing-vite8-1), lançado em 23/06/2026,
  é a linha menor atual documentada.
- O Vite 8 adicionou suporte integrado e opt-in a aliases de `tsconfig` via
  [`resolve.tsconfigPaths:
true`](https://vite.dev/config/shared-options#resolve-tsconfigpaths).
- O [plugin React
  6](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/CHANGELOG.md)
  remove Babel da instalação padrão, usa Oxc para React Refresh e expõe
  `reactCompilerPreset` para integração explícita com
  `@rolldown/plugin-babel`.

### Ação

- Baseline: Vite `>=8.1`, `@vitejs/plugin-react >=6`.
- Trocar o alias manual com `resolve(__dirname, "./src")` por
  `resolve: { tsconfigPaths: true }`, desde que o pequeno custo de resolução
  seja aceito.
- Se alias manual for mantido, usar API ESM coerente (`import.meta.dirname`) e
  caminho absoluto; não misturar `__dirname` CommonJS com config ESM.
- React Compiler deve ser uma camada opt-in com `reactCompilerPreset`, nunca uma
  dependência silenciosa do plugin React básico.
- Não ativar `experimental.bundledDev` por padrão; o próprio anúncio 8.1 o
  classifica como experimental e alerta para compatibilidade parcial de plugins.

## 4. Node.js, Corepack e pnpm

### Constatações

- O [calendário oficial do
  Node.js](https://nodejs.org/en/about/previous-releases) marca Node 20 como EOL
  desde 24/03/2026. Node 24 e Node 22 estão em LTS; Node 26 está em Current.
  Produção deve usar Active LTS ou Maintenance LTS.
- [Corepack](https://nodejs.org/api/corepack.html) é distribuído com Node de
  14.19 até, mas não incluindo, 25. Assim, `corepack enable pnpm` não é uma
  instrução universal para versões atuais/futuras do Node.
- [pnpm 11](https://pnpm.io/blog/releases/11.0) é estável desde 28/04/2026,
  requer Node 22+ e é ESM-only. Também mudou defaults de segurança e removeu
  configurações antigas de build dependencies.
- A documentação do pnpm permite fixar o gerenciador pelo campo
  [`devEngines.packageManager`](https://pnpm.io/package_json), com range,
  resolução e persistência no lockfile; o campo legado `packageManager` segue
  útil para interoperabilidade com Corepack.

### Ação

- Padrão: Node 24 LTS; mínimo suportado: Node 22 LTS; remover Node 20.
- Padrão: pnpm 11, fixado no manifesto/lockfile. Incluir migração das opções
  removidas do pnpm 10 (`allowBuilds` substitui a família antiga).
- Usar Corepack quando ele existir (Node 22/24); em Node 25+ documentar
  instalação explícita do Corepack ou instalação oficial do pnpm.
- Fazer `pnpm install --frozen-lockfile` continuar sendo o contrato de CI.

## 5. Vitest e Playwright

### Constatações

- [Vitest 4.1](https://vitest.dev/blog/vitest-4-1.html) é a linha atual
  documentada. Acrescenta detecção de leaks assíncronos e reporter `agent`.
  [Vitest 4.0](https://vitest.dev/blog/vitest-4) trouxe visual regression no
  Browser Mode e geração de Playwright traces.
- As [release notes do
  Playwright](https://playwright.dev/docs/release-notes) mostram 1.61 como a
  linha atual e incluem suporte a WebAuthn/passkeys. O baseline `>=1.61` do
  blueprint não está depreciado.

### Ação

- Elevar Vitest mínimo/recomendado para `>=4.1`.
- Manter Playwright `>=1.61` para jornadas críticas do build de produção.
- Preservar a separação de responsabilidade: Vitest para unitário/integração e
  Playwright para E2E. Browser Mode/visual regression do Vitest é capacidade
  opcional, não motivo para remover Playwright.

## 6. ESLint e Biome

### Constatações

- [ESLint 10.0](https://eslint.org/blog/2026/02/eslint-v10.0.0-released/)
  removeu completamente `eslintrc`, mudou a busca de `eslint.config.*` para
  partir de cada arquivo lintado e retirou suporte a Node abaixo de 20.19, além
  de linhas ímpares antigas. [ESLint
  10.8](https://eslint.org/blog/2026/07/eslint-v10.8.0-released/) é a release
  oficial mais recente na data de corte.
- O template já usa Flat Config, portanto está conceitualmente alinhado, mas
  deve ser testado contra a nova resolução do ESLint 10, especialmente em
  monorepos.
- [Biome 2.4](https://biomejs.dev/blog/biome-v2-4/) já oferece plugins,
  análise multi-arquivo, regras type-aware e domínios para React, projeto e
  Playwright. Logo, “aguardar type-aware linting/plugins” não é mais um blocker
  factual. A cobertura e equivalência das regras específicas do blueprint ainda
  precisam de comparação.

### Ação

- Atualizar ESLint para a linha 10.8 e exigir somente Flat Config.
- Reescrever o blocker de Biome como “paridade comprovada com o conjunto de
  regras e plugins usados por cada profile”.
- Permitir profile Biome para projetos compatíveis, mas não substituir
  ESLint + Prettier de todos os projetos sem uma matriz de equivalência.

## 7. shadcn/ui, Base UI, Radix UI e React Aria

### Constatações

- Em julho de 2026, [Base UI virou a base padrão do
  shadcn/ui](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default).
  Radix não foi depreciado e permanece totalmente suportado.
- [React Aria tornou-se base
  first-class](https://ui.shadcn.com/docs/changelog/2026-07-react-aria) e pode
  ser escolhida com `--base aria`.
- O comando `shadcn init` sem base explícita agora gera Base UI. Portanto, a
  definição do blueprint “shadcn/ui = Radix + Tailwind” e scripts que esperam
  Radix deixaram de ser determinísticos.
- A documentação do [Base
  UI](https://base-ui.com/react/overview/quick-start) o identifica como
  unstyled, tree-shakable e base dos componentes atuais do shadcn.

### Ação

- Novos projetos: Base UI como default.
- Contrato e
  [CLI sempre explícitos](https://ui.shadcn.com/docs/cli):
  - `pnpm dlx shadcn@latest init --base base`
  - `pnpm dlx shadcn@latest init --base radix`
  - `pnpm dlx shadcn@latest init --base aria`
- Projetos Radix existentes não devem migrar automaticamente; a recomendação
  oficial é manter o que funciona.
- Remover afirmações de que qualquer primitive “cuida da acessibilidade
  automaticamente”. Bibliotecas fornecem fundamentos; o produto ainda precisa
  testar semântica, conteúdo, foco, teclado, contraste e composição.

## 8. Tailwind CSS

### Constatações

- [Tailwind CSS 4.3](https://tailwindcss.com/blog/tailwindcss-v4-3) é a linha
  atual oficial. O baseline major 4 permanece correto, mas “latest” agora deve
  resolver para 4.3.
- Desde [Tailwind
  4.0](https://tailwindcss.com/blog/tailwindcss-v4), a integração preferida com
  Vite é o plugin first-party `@tailwindcss/vite`; detecção de conteúdo e
  imports são automáticos, e a configuração é CSS-first.
- Tokens devem usar
  [`@theme`](https://tailwindcss.com/docs/theme) quando geram utilities; `:root`
  continua apropriado para variáveis CSS que não geram utilities.
- A [matriz oficial de
  compatibilidade](https://tailwindcss.com/docs/compatibility) exige Chrome
  111, Safari 16.4 e Firefox 128 para o core do v4.

### Ação

- Fixar `>=4.3` para novos projetos e manter `tailwindcss` +
  `@tailwindcss/vite`.
- Tornar a matriz de browsers do Tailwind parte do profile/browser contract.
- Não criar `tailwind.config.js/ts` por hábito em projetos v4; usar configuração
  CSS-first e `@theme`, salvo requisito explícito de compatibilidade/plugin.

## 9. Prisma e Drizzle

### Constatações

- [Prisma 7](https://www.prisma.io/blog/announcing-prisma-orm-7-0-0) é a linha
  production-ready. O client padrão é ESM e rust-free, usa
  `provider = "prisma-client"`, gera código dentro do projeto e adota
  `prisma.config.ts`.
- Material oficial atualizado em julho valida
  [Prisma 7.8 como linha de
  produção](https://www.prisma.io/blog/announcing-typedsql-make-your-raw-sql-queries-type-safe-with-prisma-orm).
- [Prisma Next](https://www.prisma.io/blog/the-next-evolution-of-prisma-orm) é
  Early Access e só se tornará Prisma 8 no GA; Prisma 7 continua a recomendação
  oficial de produção. Não deve entrar como default.
- Drizzle ainda documenta
  [v1.0.0 beta](https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1beta2)
  e seu [roadmap v1](https://orm.drizzle.team/roadmap) não declara GA. O blocker
  do blueprint continua válido.

### Ação

- Atualizar default de Prisma 6.18 para Prisma 7.8.
- Tratar a migração como breaking: novo generator, output explícito, ESM,
  driver adapter e `prisma.config.ts`; não fazer substituição mecânica de versão.
- Manter Prisma Next/8 e Drizzle 1 beta fora do core. Reavaliar somente em GA.
- Validar Cloudflare Workers/D1 no profile real; a arquitetura rust-free melhora
  o edge, mas não elimina semântica SQLite, migrations e limites específicos.

## 10. Zustand, TanStack Store e TanStack Query

### Constatações

- [Zustand](https://zustand.docs.pmnd.rs/) continua mantido e documentado como
  store pequeno, hook-based e sem boilerplate. Não há anúncio oficial de
  depreciação.
- [TanStack Store](https://tanstack.com/store/latest/docs/installation) continua
  na linha `v0`, apesar de ser usado internamente pelo ecossistema. O plano
  “substituir Zustand quando Store v1 chegar a GA” ainda não foi acionado.
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
  continua na linha v5, dedicada a server state; a documentação oficial mantém
  o modelo de queries e mutations e compatibilidade com React 18+.

### Ação

- Manter Zustand como default para client state.
- Manter TanStack Query v5 para server state.
- Manter TanStack Store em avaliação; não prometer substituição automática sem
  avaliação de API, migração, persistência, devtools e maturidade no v1 real.

## 11. Datas, date-fns e Temporal

### Constatações

- O repositório chama Temporal de “Stage 3”. O registro oficial
  [TC39 Temporal](https://github.com/tc39/proposal-temporal) agora o marca
  **Stage 4** e registra envios em Firefox 139, Chrome 144 e Node 26.
- O mesmo registro ainda não lista Safari estável; a MDN classifica APIs como
  [`Temporal.PlainDate.from()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/from)
  como “Limited availability / not Baseline”.
- O próprio repositório TC39 avisa que seu polyfill de validação **não** deve ser
  usado em produção.

### Ação

- Corrigir Stage 3 para Stage 4 e remover ETA vencida.
- Manter date-fns 4 + `@date-fns/tz` como baseline cross-browser imediato.
- Permitir Temporal nativo somente quando a matriz de runtime incluir suporte,
  ou com polyfill de produção escolhido e medido explicitamente.
- Não declarar que Temporal já substituiu date-fns universalmente; formatação,
  helpers e compatibilidade ainda são requisitos distintos.

## 12. Cloudflare Pages e Workers Static Assets

### Constatações

- [Cloudflare Pages](https://developers.cloudflare.com/pages/) continua
  disponível para Git integration e direct upload; não está depreciado.
- A Cloudflare agora oferece
  [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
  e um [guia oficial de Pages para
  Workers](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/).
  Workers hospeda assets, APIs e SSR no mesmo deployment, com static asset
  requests gratuitos e uma superfície maior (Durable Objects, cron e
  observabilidade).
- Para SPA, Workers oferece
  [`assets.not_found_handling =
"single-page-application"`](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/)
  em `wrangler.jsonc`.

### Ação

- Novos projetos Cloudflare: preferir Workers Static Assets, especialmente
  quando existe API, SSR ou probabilidade de evolução para runtime edge.
- Manter Pages como opção aprovada para sites estáticos simples com workflow Git
  gerenciado e para projetos existentes; não chamá-lo de depreciado.
- Substituir a regra “Pages sempre primeiro” por decisão por capability.
- Adicionar template `wrangler.jsonc` com `compatibility_date`,
  `assets.directory: "./dist"` e routing SPA quando aplicável.

## 13. Source maps e Sentry

### Constatações

- O template força `build.sourcemap: true`, embora Sentry seja capability-gated.
- No [Vite](https://vite.dev/config/build-options#build-sourcemap), o default é
  `false`; `true` cria `.map` separado, enquanto `"hidden"` também cria o mapa
  sem adicionar comentário de referência ao bundle.
- A integração oficial do
  [Sentry para Vite](https://docs.sentry.io/platforms/javascript/sourcemaps/uploading/vite/)
  envia mapas durante o build e suporta
  `sourcemaps.filesToDeleteAfterUpload`.

### Ação

- Default universal: `build.sourcemap: false`.
- Profile Sentry: gerar `"hidden"`, fazer upload autenticado no pipeline,
  associar release/debug IDs e apagar os `.map` do artefato público após upload.
- Não confundir `"hidden"` com proteção do arquivo: ele apenas remove o
  comentário no bundle; a política de deployment deve impedir publicação dos
  mapas.

## Sequência de implementação recomendada

1. **Compatibilidade de runtime:** Node 24/22, pnpm 11 e Corepack condicional.
2. **Compilador/build:** TypeScript 7, tsconfig sem depreciações, Vite 8.1 e
   plugin React 6.
3. **Configuração e qualidade:** ESLint 10.8, Vitest 4.1, Playwright 1.61.
4. **Contratos de UI:** Base UI default explícito; Radix e Aria selecionáveis.
5. **Dados:** Prisma 7.8 com guia de migração; manter Drizzle/Prisma Next fora do
   core.
6. **Deploy/observabilidade:** Workers Static Assets por capability e source
   maps privados somente no profile Sentry.
7. **Backlog:** promover React Compiler; corrigir Temporal para Stage 4; atualizar
   blockers de Biome, Store e Drizzle.

## Critérios mínimos de validação da atualização

- `pnpm install --frozen-lockfile` em Node 22 e 24.
- Typecheck com TypeScript 7 sem opção depreciada.
- Build Vite 8.1 e preview funcional.
- Lint ESLint 10.8 com Flat Config, incluindo fixture de monorepo.
- Vitest 4.1, Playwright 1.61 e axe nas fixtures aplicáveis.
- Geração shadcn determinística para cada base suportada.
- Fixture Prisma 7 com generator/output/adapter atuais.
- Deploy de SPA em Workers Static Assets e smoke test de fallback de rota.
- Build sem Sentry não contém `.map`; build Sentry faz upload e remove `.map` do
  artefato público.
