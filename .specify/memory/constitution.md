<!--
═══════════════════════════════════════════════════════════════════════════════
SYNC IMPACT REPORT
═══════════════════════════════════════════════════════════════════════════════
Version Change: [NEW] → 1.0.0
Change Type: MAJOR (Initial constitution establishment)
Date: 2025-12-08

Modified Principles:
  • NEW: I. Integridade do Design System Nord
  • NEW: II. Arquitetura Next.js App Router & Server-First
  • NEW: III. Estado na URL (URL-First State)

Added Sections:
  • Core Principles (3 principles established)
  • Governance

Removed Sections:
  • None (initial version)

Templates Requiring Updates:
  ✅ .specify/templates/plan-template.md - Reviewed, no updates needed
  ✅ .specify/templates/spec-template.md - Reviewed, no updates needed
  ✅ .specify/templates/tasks-template.md - Reviewed, no updates needed

Follow-up TODOs:
  • None - all placeholders filled
═══════════════════════════════════════════════════════════════════════════════
-->

# Portfolio Constitution

## Core Principles

### I. Integridade do Design System Nord

**NENHUMA cor fora da especificação Nord (hex codes arbitrários) é permitida.**

O sistema MUST utilizar exclusivamente as variáveis CSS semânticas ou classes utilitárias mapeadas para os 16 tons oficiais do Nord Theme (nord0 a nord15). Isso garante consistência visual e suporte nativo a temas (Light/Dark) sem "flicker".

**Rationale**: A consistência visual é fundamental para a identidade da marca e experiência do usuário. Ao restringir a paleta de cores aos 16 tons oficiais do Nord Theme, garantimos:
- Consistência visual em toda a aplicação
- Suporte robusto para alternância de temas (Light/Dark) sem re-renderizações desnecessárias
- Manutenibilidade através de um sistema de design documentado e amplamente adotado
- Acessibilidade através de combinações de cores testadas

**Verification**: Toda mudança de UI deve ser verificada contra as variáveis CSS Nord. Code review MUST rejeitar qualquer hex code arbitrário (ex: `#FF5733`) que não corresponda às variáveis semânticas do Nord Theme.

### II. Arquitetura Next.js App Router & Server-First

**Server Components by Default.**

A diretiva `'use client'` é estritamente proibida em componentes de layout ou páginas, exceto nas "folhas" (leaves) da árvore de componentes que exigem interatividade direta (ex: listeners de eventos, hooks de estado visual). A performance de carregamento (LCP - Largest Contentful Paint) é prioridade.

**Rationale**: Next.js 13+ introduziu o App Router com Server Components como padrão, oferecendo:
- Melhor performance: redução de JavaScript enviado ao cliente
- SEO otimizado: renderização no servidor por padrão
- Menor LCP (Largest Contentful Paint): conteúdo renderizado mais rapidamente
- Melhor Developer Experience: componentes mais simples sem preocupação com hidratação

**Verification**: Durante code review, cada uso de `'use client'` MUST ser justificado. Componentes de layout e páginas MUST permanecer como Server Components. A diretiva `'use client'` só é aceitável em componentes "folha" que requerem:
- Event listeners (onClick, onChange, etc.)
- Hooks de estado (useState, useReducer)
- Hooks de efeitos (useEffect, useLayoutEffect)
- APIs do navegador (window, document)

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

2. **Dependências**: Novas bibliotecas só podem ser adicionadas se forem "headless" (sem estilos opinativos) ou estritamente necessárias para manter o bundle leve. Cada nova dependência MUST ser justificada em termos de:
   - Impacto no tamanho do bundle
   - Benefício funcional
   - Alternativas consideradas

3. **Código Limpo**: O código MUST ser fortemente tipado (TypeScript Strict Mode) e seguir os padrões de linting do projeto. Configurações do ESLint e TypeScript MUST ser mantidas em seus níveis mais rigorosos.

**Versioning Policy**: Esta constituição segue versionamento semântico:
- **MAJOR**: Mudanças incompatíveis (remoção ou redefinição de princípios)
- **MINOR**: Adição de novos princípios ou expansão de orientações
- **PATCH**: Clarificações, correções de texto, refinamentos não-semânticos

**Compliance Review**: Todos os PRs MUST verificar conformidade com esta constituição. Violações MUST ser justificadas explicitamente ou rejeitadas.

**Version**: 1.0.0 | **Ratified**: 2025-12-08 | **Last Amended**: 2025-12-08
