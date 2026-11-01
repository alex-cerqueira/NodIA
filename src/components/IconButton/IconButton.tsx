import * as React from 'react';
import { cx } from '../../utils/cx.js';
import type { ButtonVariant } from '../Button/Button.js';

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'children'> {
  /** Nome acessível obrigatório: não há texto visível. */
  'aria-label': string;
  variant?: ButtonVariant;
  /** Ícone (SVG ou texto). O Figma usa o glifo provisório "+". */
  icon?: React.ReactNode;
}

/** Botão quadrado 40 × 40 só com ícone (Figma: Icon Button). */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'primary', icon = '+', type = 'button', className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx('nd-icon-button', `nd-icon-button--${variant}`, className)}
      {...rest}
    >
      <span aria-hidden="true" className="nd-icon-button__icon">{icon}</span>
    </button>
  );
});
