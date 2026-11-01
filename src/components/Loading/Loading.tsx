import * as React from 'react';
import { cx } from '../../utils/cx.js';

export type LoadingType = 'spinner' | 'skeleton';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: LoadingType;
  /** Texto lido por leitores de tela. */
  label?: string;
  /** Larguras (px) das linhas do skeleton. Padrão: 280, 220 e 160, como no Figma. */
  lines?: number[];
}

/** Estados de carregamento (Figma: Loading — Spinner e Skeleton). A animação respeita prefers-reduced-motion. */
export const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(function Loading(
  { type = 'spinner', label = 'Carregando', lines = [280, 220, 160], className, ...rest },
  ref,
) {
  return (
    <div ref={ref} role="status" aria-live="polite" className={cx('nd-loading', `nd-loading--${type}`, className)} {...rest}>
      {type === 'spinner' ? (
        <span className="nd-loading__spinner" aria-hidden="true" />
      ) : (
        <span aria-hidden="true" className="nd-loading__lines">
          {lines.map((w, i) => <span key={i} className="nd-loading__line" style={{ width: w }} />)}
        </span>
      )}
      <span className="nd-visually-hidden">{label}</span>
    </div>
  );
});
