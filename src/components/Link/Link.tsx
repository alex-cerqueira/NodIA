import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link externo: abre em nova aba com rel seguro e mostra a seta ↗. */
  external?: boolean;
  /** Visual desabilitado. O link deixa de ser focável e recebe aria-disabled. */
  disabled?: boolean;
}

/** Link de texto sublinhado (Figma: Link — Default, Hover e Disabled). */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { external, disabled, className, children, href, onClick, ...rest },
  ref,
) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a
      ref={ref}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      onClick={disabled ? (e) => e.preventDefault() : onClick}
      className={cx('nd-link', disabled && 'nd-link--disabled', className)}
      {...externalProps}
      {...rest}
    >
      {children}
      {external ? <span aria-hidden="true"> ↗</span> : null}
      {external ? <span className="nd-visually-hidden"> (abre em nova aba)</span> : null}
    </a>
  );
});
