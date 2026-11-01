import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  'aria-label'?: string;
  className?: string;
}

/** Abas com padrão WAI-ARIA e navegação por setas (Figma: Tabs e Tab). */
export function Tabs({ items, value, defaultValue, onValueChange, className, 'aria-label': ariaLabel }: TabsProps) {
  const base = React.useId();
  const [inner, setInner] = React.useState(defaultValue ?? items.find((i) => !i.disabled)?.id ?? '');
  const current = value ?? inner;
  const refs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const enabled = items.filter((i) => !i.disabled);

  const select = (id: string) => {
    if (value === undefined) setInner(id);
    onValueChange?.(id);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = enabled.findIndex((i) => i.id === current);
    let next = -1;
    if (e.key === 'ArrowRight') next = (idx + 1) % enabled.length;
    else if (e.key === 'ArrowLeft') next = (idx - 1 + enabled.length) % enabled.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = enabled.length - 1;
    if (next >= 0) {
      e.preventDefault();
      const id = enabled[next].id;
      select(id);
      refs.current[id]?.focus();
    }
  };

  return (
    <div className={cx('nd-tabs', className)}>
      <div role="tablist" aria-label={ariaLabel} className="nd-tabs__list" onKeyDown={onKeyDown}>
        {items.map((t) => {
          const active = t.id === current;
          return (
            <button
              key={t.id}
              ref={(n) => { refs.current[t.id] = n; }}
              role="tab"
              type="button"
              id={`${base}-tab-${t.id}`}
              aria-selected={active}
              aria-controls={`${base}-panel-${t.id}`}
              tabIndex={active ? 0 : -1}
              disabled={t.disabled}
              className={cx('nd-tabs__tab', active && 'nd-tabs__tab--active')}
              onClick={() => select(t.id)}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {items.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${base}-panel-${t.id}`}
          aria-labelledby={`${base}-tab-${t.id}`}
          hidden={t.id !== current}
          tabIndex={0}
          className="nd-tabs__panel"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
