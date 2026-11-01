import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: 'horizontal' | 'vertical';
  /** Divisor puramente visual: oculto de leitores de tela. */
  decorative?: boolean;
}

/** Filete divisor de 1 px (Figma: Divider — Horizontal e Vertical). */
export const Divider = React.forwardRef<HTMLElement, DividerProps>(function Divider(
  { orientation = 'horizontal', decorative = true, className, ...rest },
  ref,
) {
  const cls = cx('nd-divider', `nd-divider--${orientation}`, className);
  if (orientation === 'horizontal' && !decorative) {
    return <hr ref={ref as React.Ref<HTMLHRElement>} className={cls} {...rest} />;
  }
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={cls}
      {...rest}
    />
  );
});
