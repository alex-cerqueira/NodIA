import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aplica a margem lateral do breakpoint (64, 40 ou 20 px). Padrão: true. */
  withMargin?: boolean;
}

/**
 * Grade de colunas (Figma: Grid). 12 colunas no desktop (gutter 24, margem 64), 8 no tablet
 * (gutter 20, margem 40) e 4 no mobile (gutter 16, margem 20). Os pontos de quebra
 * (≥1024 px, 640–1023 px e <640 px) são uma suposição, pois o Figma não os define.
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(function Grid(
  { withMargin = true, className, ...rest },
  ref,
) {
  return <div ref={ref} className={cx('nd-grid', withMargin && 'nd-grid--margin', className)} {...rest} />;
});

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Colunas ocupadas (1 a 12). Limitado ao total do breakpoint. */
  span?: number;
  /** Coluna inicial (1 a 12). */
  start?: number;
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(function GridItem(
  { span, start, className, style, ...rest },
  ref,
) {
  const s: React.CSSProperties = {
    ...(span ? { ['--nd-span' as string]: span } : {}),
    ...(start ? { ['--nd-start' as string]: start } : {}),
    ...style,
  };
  return <div ref={ref} className={cx('nd-grid__item', className)} style={s} {...rest} />;
});
