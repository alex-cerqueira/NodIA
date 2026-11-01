# Nodia Design System

Design system de **40 componentes** em React + TypeScript, com tokens em **Light e Dark**, construído a partir do arquivo do Figma do portfólio de Alex Cerqueira (case Nodia).

> Versão **0.1.0 (Draft)**. Há pendências abertas, listadas abaixo e na página "05 — Changelog" do Figma.

## O que tem aqui

- `src/styles/tokens.css`: tokens (cores, espaçamento, raios, tipografia, movimento) com as mesmas variáveis do Figma (coleções Primitives, Color, Spacing e Radius).
- `src/components/*`: os 40 componentes, em 6 famílias (Ações, Formulários, Navegação, Conteúdo, Feedback e Estrutura).
- `src/styles/components/*.css`: estilos dos componentes (classes `nd-*`), sem dependência de CSS-in-JS.
- `docs/COMPONENTS.md`: mapa de cada componente de código para o componente do Figma.

## Uso

```bash
npm install nodia react react-dom
```

```tsx
import { Button, TextField, ThemeToggle } from 'nodia';
import 'nodia/styles.css';

export function Exemplo() {
  return (
    <div className="nd-root">
      <ThemeToggle />
      <TextField label="Nome" helperText="Como no documento" />
      <Button>Salvar</Button>
    </div>
  );
}
```

`nodia/styles.css` inclui tokens, base e componentes. Para usar só os tokens: `import 'nodia/tokens.css'`.

### Tema

Defina `data-theme="light"` ou `data-theme="dark"` em `<html>` (o `ThemeToggle` faz isso). Sem `data-theme`, o padrão é o **escuro** (como no case Nodia), ou claro se o sistema preferir claro.

### Fontes

O sistema usa **Geist** e **IBM Plex Mono**, mas não as incorpora. Carregue-as no seu app (por exemplo, pelo Google Fonts ou `@fontsource`); há fallback para fontes do sistema.

## Componentes

| Família | Componentes |
|---|---|
| Ações | Button, IconButton, Link, ButtonGroup, ThemeToggle |
| Formulários | TextField, Textarea, Select, Checkbox, Radio, Switch, Slider, Search |
| Navegação | Header, Menu, Tabs, Breadcrumbs, Pagination, SidebarIndex, ProgressBar |
| Conteúdo | Card, Table, List, Quote, StatBlock, Tag, Avatar, Carousel, Accordion, Steps |
| Feedback | Alert, Toast, Modal, Tooltip, Popover, Loading |
| Estrutura | Grid (e GridItem), Divider, Logo, Footer |

Estados como Hover, Focus e Disabled vêm de `:hover`, `:focus-visible` e `:disabled`, não de props. Variantes do Figma viram props (`variant`, `size`, `type`, `orientation`...).

## Scripts

```bash
npm run typecheck   # verifica os tipos
npm run build       # gera dist/ (JS + tipos + CSS)
npm test            # build + teste de fumaça: renderiza os 40 componentes no servidor
```

## Decisões e pontos a validar

Itens que o Figma ainda não define; o código segue uma escolha razoável, marcada aqui para revisão:

- **Foco:** só Text Field, Textarea, Select e Search têm variante de foco no Figma. No código, todos usam um anel `:focus-visible` de 2 px na cor de acento.
- **Contraste:** `color/text/faint` (placeholders) e `color/border/default` ficam abaixo dos mínimos da WCAG 2.2 (1.4.3 e 1.4.11). Os tokens foram mantidos como no Figma; corrigi-los é uma decisão de design.
- **Grid:** o Figma define 12, 8 e 4 colunas, mas não os pontos de quebra. O código usa ≥1024 px, 640–1023 px e <640 px (suposição).
- **Header:** abaixo de 720 px os links viram o botão "Menu" (suposição de breakpoint).
- **Accordion:** `multiple` é falso por padrão; o Figma não define abertura múltipla.
- **Modal:** usa `<dialog>` nativo; o fundo (scrim) é `rgba(0,0,0,.5)`, pois o Figma não o define.
- **Radio:** não há componente de grupo no Figma; use `<fieldset>` com `<legend>`.
- **Logo:** provisório, como no Figma. Substitua pelo arquivo oficial.
- **Ícones:** `IconButton` usa o glifo "+" por padrão; passe `icon` com seu SVG.
- **Propriedades de texto:** rótulos de Link, Tag e outros ainda não são propriedades no Figma; no código são `children` ou props.

## Licença

MIT. Veja [LICENSE](LICENSE).
