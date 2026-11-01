import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface PopoverProps {
  /** Elemento que abre o painel (ex.: <Button>). Recebe aria-expanded e aria-controls. */
  trigger: React.ReactElement;
  title: string;
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/** Painel flutuante ancorado a um gatilho (Figma: Popover). Clique fora e Esc fecham. */
export function Popover({ trigger, title, children, open, defaultOpen = false, onOpenChange, className }: PopoverProps) {
  const [inner, setInner] = React.useState(defaultOpen);
  const isOpen = open ?? inner;
  const id = React.useId();
  const root = React.useRef<HTMLSpanElement | null>(null);

  const set = React.useCallback((v: boolean) => {
    if (open === undefined) setInner(v);
    onOpenChange?.(v);
  }, [open, onOpenChange]);

  React.useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => { if (root.current && !root.current.contains(e.target as Node)) set(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') set(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [isOpen, set]);

  const tr = trigger as React.ReactElement<Record<string, unknown>>;
  const btn = React.cloneElement(tr, {
    'aria-expanded': isOpen,
    'aria-controls': id,
    'aria-haspopup': 'dialog',
    onClick: (e: React.MouseEvent) => { (tr.props.onClick as ((e: React.MouseEvent) => void) | undefined)?.(e); set(!isOpen); },
  });

  return (
    <span ref={root} className={cx('nd-popover', className)}>
      {btn}
      <div id={id} role="dialog" aria-label={title} hidden={!isOpen} className="nd-popover__panel">
        <h3 className="nd-popover__title">{title}</h3>
        <div className="nd-popover__body">{children}</div>
      </div>
    </span>
  );
}
