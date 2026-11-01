// Concatena os CSS do pacote em dist/tokens.css e dist/styles.css (tokens + base + componentes).
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const styles = join(root, 'src', 'styles');
const read = (f) => readFileSync(join(styles, f), 'utf8');

mkdirSync(join(root, 'dist'), { recursive: true });
const tokens = read('tokens.css');
const base = read('base.css');
const comps = readdirSync(join(styles, 'components')).filter((f) => f.endsWith('.css')).sort()
  .map((f) => `/* ${f} */\n` + readFileSync(join(styles, 'components', f), 'utf8')).join('\n');

writeFileSync(join(root, 'dist', 'tokens.css'), tokens);
writeFileSync(join(root, 'dist', 'styles.css'), [tokens, base, comps].join('\n'));
console.log('CSS gerado em dist/tokens.css e dist/styles.css');
