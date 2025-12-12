<!--
═══════════════════════════════════════════════════════════════════════════════
SYNC IMPACT REPORT
═══════════════════════════════════════════════════════════════════════════════
Version Change: 1.0.0 → 2.0.0
Change Type: MAJOR (Technology stack redefinition)
Date: 2025-12-11

Modified Principles:
  • I. Integridade do Design System Nord
    - Added: MUI theme object (src/lib/theme/muiTheme.ts) as valid color source
    - Maintained: Nord palette (nord0-nord15) exclusivity requirement
  • II. Arquitetura Next.js App Router & Server-First → II. Arquitetura Next.js & Material UI Integration
    - Added: Guidance on MUI requiring 'use client' for visual components
    - Maintained: Server-first philosophy for data fetching and layouts
    - Clarified: Acceptable use of CSS-in-JS for MUI components

Added Sections:
  • Governance: Official Technology Stack definition

Removed Sections:
  • None

Governance Changes:
  • Replaced "headless-only libraries" rule with Official Stack:
    Next.js + Tailwind CSS + Material UI (MUI)
  • Added justification: Development velocity and pre-built consistency
  • Acknowledged trade-off: Bundle size increase

Templates Requiring Updates:
  ⚠ .specify/templates/plan-template.md - Update "Primary Dependencies" to suggest MUI
  ✅ .specify/templates/spec-template.md - No changes required
  ✅ .specify/templates/tasks-template.md - No changes required
  ✅ .specify/templates/commands/*.md - No changes required

Follow-up TODOs:
  • Update plan-template.md to list Material UI in recommended dependencies
  • Consider documenting MUI component usage patterns in project docs
═══════════════════════════════════════════════════════════════════════════════
-->

# Portfolio Constitution

## Core Principles

### I. Integridade do Design System Nord

**NENHUMA cor fora da especificação Nord (hex codes arbitrários) é permitida.**

O sistema MUST utilizar exclusivamente:
1. **Variáveis CSS semânticas** ou classes utilitárias Tailwind mapeadas para os 16 tons oficiais do Nord Theme (nord0 a nord15), ou
2. **Objeto de tema do Material UI** (`src/lib/theme/muiTheme.ts`) que mapeia as cores da paleta Nord para os tokens semânticos do MUI (primary, secondary, error, etc.)

Isso garante consistência visual e suporte nativo a temas (Light/Dark) sem "flicker".

**Rationale**: A consistência visual é fundamental para a identidade da marca e experiência do usuário. Ao restringir a paleta de cores aos 16 tons oficiais do Nord Theme, garantimos:
- Consistência visual em toda a aplicação
- Suporte robusto para alternância de temas (Light/Dark) sem re-renderizações desnecessárias
- Manutenibilidade através de um sistema de design documentado e amplamente adotado
- Acessibilidade através de combinações de cores testadas
- Interoperabilidade entre Tailwind CSS e Material UI através de mapeamento centralizado

**Verification**: Toda mudança de UI deve ser verificada contra:
- Variáveis CSS Nord (`--nord-X`) ou classes Tailwind CSS (`bg-nord-X`, `text-nord-X`)
- Tokens do tema MUI (`theme.palette.primary.main`, `theme.palette.background.default`)

Code review MUST rejeitar:
- Hex codes arbitrários (ex: `#FF5733`) que não correspondam às variáveis Nord
- Uso direto de `sx={{ color: '#...' }}` sem referência ao tema
- Criação de paletas customizadas fora do `muiTheme.ts`

### II. Arquitetura Next.js & Material UI Integration

**Server Components by Default, Client Components for MUI.**

A diretiva `'use client'` é estritamente proibida em componentes de layout ou páginas de rota principal (ex: `app/layout.tsx`, `app/page.tsx`), exceto nas "folhas" (leaves) da árvore de componentes que exigem interatividade direta ou que utilizam componentes do Material UI. A performance de carregamento (LCP - Largest Contentful Paint) é prioridade.

**Material UI Exception**: Componentes MUI requerem CSS-in-JS via Emotion, o que necessita `'use client'`. Isso é aceitável para componentes visuais interativos, mas:
- Data fetching MUST permanecer em Server Components (páginas, layouts)
- Estruturas de layout MUST ser Server Components que recebem Client Components como children
- Lógica de negócio e acesso a dados MUST ser servidor-first

**Rationale**: Next.js 13+ introduziu o App Router com Server Components como padrão, oferecendo:
- Melhor performance: redução de JavaScript enviado ao cliente
- SEO otimizado: renderização no servidor por padrão
- Menor LCP (Largest Contentful Paint): conteúdo renderizado mais rapidamente
- Melhor Developer Experience: componentes mais simples sem preocupação com hidratação

Material UI traz:
- Aceleração de desenvolvimento com componentes pré-construídos
- Consistência visual através de sistema de design maduro
- Trade-off aceitável: CSS-in-JS aumenta bundle, mas elimina trabalho repetitivo

**Verification**: Durante code review:
- Componentes de layout e páginas de rota MUST permanecer Server Components
- `'use client'` em componentes visuais/interativos que usam MUI é aceitável e esperado
- Data fetching via `fetch()`, banco de dados, ou APIs externas MUST ocorrer em Server Components
- A diretiva `'use client'` só é aceitável em componentes "folha" que requerem:
  - Event listeners (onClick, onChange, etc.)
  - Hooks de estado (useState, useReducer)
  - Hooks de efeitos (useEffect, useLayoutEffect)
  - APIs do navegador (window, document)
  - Componentes do Material UI (Button, TextField, etc.)

### III. Estado na URL (URL-First State)

**O estado da aplicação deve ser refletido na URL.**

É proibido o uso de estado local efêmero (`useState`) para dados que devem ser persistentes, compartilháveis ou filtráveis (ex: filtros de tecnologia na galeria). A navegação MUST ser "shareable" e respeitar o botão "voltar" do navegador.

**Rationale**: URLs são o mecanismo universal de compartilhamento e navegação na web. Estado na URL garante:
- Shareability: usuários podem compartilhar links com estado específico (ex: filtros aplicados)
- Bookmarkability: estado pode ser salvo como favorito
- Browser history: botão "voltar" funciona corretamente
- Deep linking: navegação direta para estados específicos
- SEO: mecanismos de busca indexam estados diferentes

**Verification**: Durante code review, todo uso de `useState` para dados filtráveis, ordenáveis ou navegáveis MUST ser questionado. Prefira:
- `useSearchParams()` para query parameters
- Segmentos dinâmicos de rota para navegação estruturada
- `useRouter()` para navegação programática que preserve estado na URL

Exceções aceitáveis para `useState`:
- Estado puramente visual/UI (ex: menu aberto/fechado, hover states)
- Estado de formulário antes de submissão
- Animações e transições

## Governance

**Amendment Process**: Mudanças nesta constituição requerem:
1. Discussão documentada sobre o impacto da mudança
2. Atualização do número de versão seguindo versionamento semântico
3. Propagação de mudanças para templates e documentação relacionada
4. Code review e aprovação antes de merge

**Compliance Standards**:

1. **Acessibilidade não é opcional**: Todos os elementos interativos MUST ter estados de foco visíveis e contraste adequado (WCAG AA) em ambos os temas (Light/Dark). Ferramentas automatizadas de teste de acessibilidade SHOULD ser integradas no pipeline CI/CD.

2. **Stack Oficial**: Este projeto utiliza uma pilha tecnológica definida:
   - **Next.js**: Framework React com App Router e Server Components
   - **Tailwind CSS**: Utilitários CSS para estilização rápida e consistente
   - **Material UI (MUI)**: Biblioteca de componentes visuais pré-construídos

   **Justificativa**: A combinação Next.js + Tailwind + MUI prioriza:
   - Velocidade de desenvolvimento: componentes prontos reduzem trabalho repetitivo
   - Consistência visual: sistema de design maduro e amplamente testado
   - Manutenibilidade: documentação robusta e comunidade ativa

   **Trade-off Aceito**: Material UI aumenta o bundle size devido a CSS-in-JS (Emotion), mas elimina a necessidade de construir componentes complexos do zero (modais, menus, formulários).

   **Adição de Novas Dependências**: Bibliotecas além do stack oficial só podem ser adicionadas se estritamente necessárias. Cada nova dependência MUST ser justificada em termos de:
   - Impacto no tamanho do bundle
   - Benefício funcional claro não coberto pelo stack oficial
   - Alternativas consideradas (incluindo implementação manual)
   - Compatibilidade com Next.js App Router e Material UI

3. **Código Limpo**: O código MUST ser fortemente tipado (TypeScript Strict Mode) e seguir os padrões de linting do projeto. Configurações do ESLint e TypeScript MUST ser mantidas em seus níveis mais rigorosos.

**Versioning Policy**: Esta constituição segue versionamento semântico:
- **MAJOR**: Mudanças incompatíveis (remoção ou redefinição de princípios)
- **MINOR**: Adição de novos princípios ou expansão de orientações
- **PATCH**: Clarificações, correções de texto, refinamentos não-semânticos

**Compliance Review**: Todos os PRs MUST verificar conformidade com esta constituição. Violações MUST ser justificadas explicitamente ou rejeitadas.

**Version**: 2.0.0 | **Ratified**: 2025-12-08 | **Last Amended**: 2025-12-11
