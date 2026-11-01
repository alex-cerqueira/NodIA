// Teste de fumaça: renderiza os 40 componentes no servidor e confere que nenhum quebra.
import React from 'react';
import { renderToString } from 'react-dom/server';
import * as N from '../dist/index.js';

const h = React.createElement;
const noop = () => {};
const cases = {
  Button: () => h(N.Button, null, 'Salvar'),
  IconButton: () => h(N.IconButton, { 'aria-label': 'Adicionar' }),
  Link: () => h(N.Link, { href: '/x', external: true }, 'Saiba mais'),
  ButtonGroup: () => h(N.ButtonGroup, { 'aria-label': 'Período' }, h(N.Button, { variant: 'secondary' }, 'Dia'), h(N.Button, { variant: 'secondary' }, 'Mês')),
  ThemeToggle: () => h(N.ThemeToggle, { applyToDocument: false }),
  TextField: () => h(N.TextField, { label: 'Nome', error: 'Campo obrigatório' }),
  Textarea: () => h(N.Textarea, { label: 'Mensagem', helperText: 'Até 500 caracteres' }),
  Select: () => h(N.Select, { label: 'País', placeholder: 'Selecione' }, h('option', { value: 'br' }, 'Brasil')),
  Checkbox: () => h(N.Checkbox, { label: 'Aceito os termos', defaultChecked: true }),
  Radio: () => h(N.Radio, { label: 'Opção', name: 'g' }),
  Switch: () => h(N.Switch, { label: 'Notificações' }),
  Slider: () => h(N.Slider, { 'aria-label': 'Volume' }),
  Search: () => h(N.Search, { 'aria-label': 'Buscar projetos' }),
  Header: () => h(N.Header, { logo: h(N.Logo), links: [{ label: 'Projetos', href: '/p', current: true }], actions: h(N.ThemeToggle, { applyToDocument: false }) }),
  Menu: () => h(N.Menu, { 'aria-label': 'Seções', items: [{ label: 'Visão geral', href: '#a', current: true }, { label: 'Ações', onSelect: noop }] }),
  Tabs: () => h(N.Tabs, { 'aria-label': 'Abas', items: [{ id: 'a', label: 'A', content: 'Conteúdo A' }, { id: 'b', label: 'B', content: 'Conteúdo B' }] }),
  Breadcrumbs: () => h(N.Breadcrumbs, { items: [{ label: 'Início', href: '/' }, { label: 'Projetos', href: '/p' }, { label: 'Nodia' }] }),
  Pagination: () => h(N.Pagination, { page: 5, pageCount: 20, onPageChange: noop }),
  SidebarIndex: () => h(N.SidebarIndex, { items: [{ id: 'a', label: 'Contexto' }, { id: 'b', label: 'Problema' }] }),
  ProgressBar: () => h(N.ProgressBar, { value: 50, 'aria-label': 'Leitura' }),
  Card: () => h(N.Card, { meta: 'Caso 01', title: 'Nodia', description: 'Design system', href: '/nodia' }),
  Table: () => h(N.Table, { caption: 'Métodos', columns: [{ key: 'a', header: 'Método' }, { key: 'b', header: 'Etapa' }], rows: [{ a: 'Auditoria', b: 'Entender' }] }),
  List: () => h(N.List, { ordered: true }, h('li', null, 'Um'), h('li', null, 'Dois')),
  Quote: () => h(N.Quote, { author: 'Autoria' }, 'Citação.'),
  StatBlock: () => h(N.StatBlock, { stats: [{ value: '40', label: 'Componentes' }] }),
  Tag: () => h(N.Tag, { variant: 'accent' }, 'Tag'),
  Avatar: () => h(N.Avatar, { name: 'Alex Cerqueira', size: 'lg' }),
  Carousel: () => h(N.Carousel, { 'aria-label': 'Galeria', slides: ['Um', 'Dois', 'Três'] }),
  Accordion: () => h(N.Accordion, { defaultOpen: ['a'], items: [{ id: 'a', title: 'Pergunta', content: 'Resposta' }] }),
  Steps: () => h(N.Steps, { steps: ['Entender', 'Explorar', 'Projetar'], current: 1 }),
  Alert: () => h(N.Alert, { type: 'danger', title: 'Erro' }, 'Algo deu errado.'),
  Toast: () => h(N.Toast, { type: 'success', message: 'Salvo', action: { label: 'Desfazer', onClick: noop } }),
  Modal: () => h(N.Modal, { open: false, onClose: noop, title: 'Confirmar', footer: h(N.Button, null, 'OK') }, 'Texto'),
  Tooltip: () => h(N.Tooltip, { content: 'Dica' }, h(N.IconButton, { 'aria-label': 'Ajuda' })),
  Popover: () => h(N.Popover, { title: 'Sobre', trigger: h(N.Button, null, 'Abrir') }, 'Conteúdo'),
  Loading: () => h('div', null, h(N.Loading), h(N.Loading, { type: 'skeleton' })),
  Grid: () => h(N.Grid, null, h(N.GridItem, { span: 6 }, 'A'), h(N.GridItem, { span: 6 }, 'B')),
  Divider: () => h(N.Divider, { decorative: false }),
  Logo: () => h(N.Logo, { variant: 'symbol' }),
  Footer: () => h(N.Footer, { logo: h(N.Logo), legal: '© Alex Cerqueira', groups: [{ title: 'Projetos', links: [{ label: 'Nodia', href: '/n' }] }] }),
};

let failed = 0;
for (const [name, make] of Object.entries(cases)) {
  try {
    const html = renderToString(make());
    if (!html || !html.includes('nd-')) throw new Error('HTML vazio ou sem classe nd-');
  } catch (e) {
    failed++;
    console.error('✕', name, '-', e.message);
  }
}
const total = Object.keys(cases).length;
console.log(failed ? `${failed} de ${total} falharam` : `✓ ${total} componentes renderizaram sem erro`);
if (total !== 40) { console.error('Esperado 40 componentes, teste cobre', total); process.exit(1); }
process.exit(failed ? 1 : 0);
