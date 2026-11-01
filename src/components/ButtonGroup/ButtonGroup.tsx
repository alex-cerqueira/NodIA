import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Nome do grupo para leitores de tela. */
  'aria-label'?: string;
}

/** Agrupa botões do mesmo nível em linha, com gap space-2 (Figma: Button Group). */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} role="group" className={cx('nd-button-group', className)} {...rest} />;
});
