import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Valor de 0 a max. */
  value: number;
  max?: number;
  /** Nome acessível (obrigatório). */
  'aria-label': string;
}

/** Barra de progresso (Figma: Progress Bar — Value 0 a 100). */
export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { value, max = 100, className, ...rest },
  ref,
) {
  const clamped = Math.min(Math.max(value, 0), max);
  return (
    <div ref={ref} role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={clamped} className={cx('nd-progress', className)} {...rest}>
      <div className="nd-progress__bar" style={{ width: `${(clamped / max) * 100}%` }} />
    </div>
  );
});
