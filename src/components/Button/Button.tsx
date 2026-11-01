import * as React from 'react';
import { cx } from '../../utils/cx.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'sm';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Hierarquia da ação. Use um único primary por área. */
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** Botão de ação (Figma: Button — Variant, Size e State; Hover e Disabled vêm de :hover e :disabled). */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', type = 'button', className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx('nd-button', `nd-button--${variant}`, `nd-button--${size}`, className)}
      {...rest}
    />
  );
});
