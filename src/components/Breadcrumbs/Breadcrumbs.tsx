import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  'aria-label'?: string;
}

/** Trilha de navegação; o último item é a página atual (Figma: Breadcrumbs). */
export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(function Breadcrumbs(
  { items, className, 'aria-label': ariaLabel = 'Breadcrumb', ...rest },
  ref,
) {
  return (
    <nav ref={ref} aria-label={ariaLabel} className={cx('nd-breadcrumbs', className)} {...rest}>
      <ol className="nd-breadcrumbs__list">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${it.label}-${i}`} className="nd-breadcrumbs__item">
              {last || !it.href ? (
                <span className="nd-breadcrumbs__current" aria-current={last ? 'page' : undefined}>{it.label}</span>
              ) : (
                <a className="nd-breadcrumbs__link" href={it.href}>{it.label}</a>
              )}
              {!last ? <span className="nd-breadcrumbs__sep" aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
