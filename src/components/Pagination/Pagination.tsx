import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Página atual, a partir de 1. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  'aria-label'?: string;
}

function range(page: number, count: number): Array<number | 'gap-start' | 'gap-end'> {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const out: Array<number | 'gap-start' | 'gap-end'> = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(count - 1, page + 1);
  if (start > 2) out.push('gap-start');
  for (let p = start; p <= end; p++) out.push(p);
  if (end < count - 1) out.push('gap-end');
  out.push(count);
  return out;
}

/** Paginação com setas e páginas numeradas (Figma: Pagination e Page Item). */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { page, pageCount, onPageChange, className, 'aria-label': ariaLabel = 'Paginação', ...rest },
  ref,
) {
  const go = (p: number) => onPageChange(Math.min(Math.max(1, p), pageCount));
  return (
    <nav ref={ref} aria-label={ariaLabel} className={cx('nd-pagination', className)} {...rest}>
      <ul className="nd-pagination__list">
        <li>
          <button type="button" className="nd-pagination__item" aria-label="Página anterior" disabled={page <= 1} onClick={() => go(page - 1)}>‹</button>
        </li>
        {range(page, pageCount).map((p) =>
          typeof p === 'number' ? (
            <li key={p}>
              <button
                type="button"
                className={cx('nd-pagination__item', p === page && 'nd-pagination__item--active')}
                aria-label={`Página ${p}`}
                aria-current={p === page ? 'page' : undefined}
                onClick={() => go(p)}
              >{p}</button>
            </li>
          ) : (
            <li key={p} className="nd-pagination__gap" aria-hidden="true">…</li>
          ),
        )}
        <li>
          <button type="button" className="nd-pagination__item" aria-label="Próxima página" disabled={page >= pageCount} onClick={() => go(page + 1)}>›</button>
        </li>
      </ul>
    </nav>
  );
});
