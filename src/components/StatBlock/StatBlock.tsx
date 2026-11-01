import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface Stat {
  value: string;
  label: string;
}

export interface StatBlockProps extends Omit<React.HTMLAttributes<HTMLDListElement>, 'children'> {
  /** Use apenas números reais e verificáveis. */
  stats: Stat[];
}

/** Bloco de números grandes com rótulo em mono (Figma: Stat Block). */
export const StatBlock = React.forwardRef<HTMLDListElement, StatBlockProps>(function StatBlock(
  { stats, className, ...rest },
  ref,
) {
  return (
    <dl ref={ref} className={cx('nd-stat-block', className)} {...rest}>
      {stats.map((s) => (
        <div key={s.label} className="nd-stat-block__item">
          <dd className="nd-stat-block__value">{s.value}</dd>
          <dt className="nd-stat-block__label">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
});
