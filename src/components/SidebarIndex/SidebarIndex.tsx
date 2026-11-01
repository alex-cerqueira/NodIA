import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface SidebarIndexItem {
  /** id do elemento de destino na página (sem #). */
  id: string;
  label: string;
}

export interface SidebarIndexProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  items: SidebarIndexItem[];
  /** Seção ativa (controlado). Sem valor, acompanha a rolagem da página. */
  activeId?: string;
  'aria-label'?: string;
}

/** Índice lateral de seções com scroll-spy opcional (Figma: Sidebar Index e Index Item). */
export const SidebarIndex = React.forwardRef<HTMLElement, SidebarIndexProps>(function SidebarIndex(
  { items, activeId, className, 'aria-label': ariaLabel = 'Nesta página', ...rest },
  ref,
) {
  const [spy, setSpy] = React.useState(items[0]?.id);

  React.useEffect(() => {
    if (activeId !== undefined || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setSpy(visible.target.id);
      },
      { rootMargin: '0px 0px -60% 0px' },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items, activeId]);

  const current = activeId ?? spy;
  return (
    <nav ref={ref} aria-label={ariaLabel} className={cx('nd-sidebar-index', className)} {...rest}>
      <ol className="nd-sidebar-index__list">
        {items.map((it, i) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={cx('nd-sidebar-index__item', it.id === current && 'nd-sidebar-index__item--active')}
              aria-current={it.id === current ? 'location' : undefined}
            >
              <span className="nd-sidebar-index__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span>{it.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
});
