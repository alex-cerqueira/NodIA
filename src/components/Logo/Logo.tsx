import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'wordmark' | 'symbol';
  /** Nome acessível. */
  'aria-label'?: string;
}

/** Logotipo provisório "Nodia" (Figma: Logo — Wordmark e Symbol). Substitua pelo arquivo oficial da marca. */
export const Logo = React.forwardRef<HTMLSpanElement, LogoProps>(function Logo(
  { variant = 'wordmark', className, 'aria-label': ariaLabel = 'Nodia', ...rest },
  ref,
) {
  return (
    <span ref={ref} role="img" aria-label={ariaLabel} className={cx('nd-logo', `nd-logo--${variant}`, className)} {...rest}>
      {variant === 'symbol' ? (
        <span aria-hidden="true">N</span>
      ) : (
        <span aria-hidden="true" className="nd-logo__word">Nodia<span className="nd-logo__dot" /></span>
      )}
    </span>
  );
});
