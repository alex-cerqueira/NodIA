import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface SearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Nome acessível do campo. */
  'aria-label': string;
  /** Tecla de atalho que foca o campo fora de outros campos. Use false para desativar. */
  shortcut?: string | false;
}

/** Campo de busca com atalho de teclado (Figma: Search — Default e Focus). */
export const Search = React.forwardRef<HTMLInputElement, SearchProps>(function Search(
  { className, shortcut = '/', placeholder = 'Buscar', ...rest },
  ref,
) {
  const inner = React.useRef<HTMLInputElement | null>(null);
  const setRefs = (node: HTMLInputElement | null) => {
    inner.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
  };

  React.useEffect(() => {
    if (!shortcut) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
      if (e.key === shortcut && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        inner.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [shortcut]);

  return (
    <div role="search" className={cx('nd-search', className)}>
      <input ref={setRefs} type="search" className="nd-search__input" placeholder={placeholder} aria-keyshortcuts={shortcut || undefined} {...rest} />
      {shortcut ? <kbd className="nd-search__shortcut" aria-hidden="true">{shortcut}</kbd> : null}
    </div>
  );
});
