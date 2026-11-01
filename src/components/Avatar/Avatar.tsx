import * as React from 'react';
import { cx } from '../../utils/cx.js';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Nome completo; vira o nome acessível e gera as iniciais. */
  name: string;
  size?: AvatarSize;
  /** Imagem opcional. Sem ela, mostra duas iniciais. */
  src?: string;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  const first = parts[0][0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : '';
  return (first + last).toUpperCase();
}

/** Avatar circular com iniciais (Figma: Avatar — Sm 32, Md 40, Lg 56). */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { name, size = 'md', src, className, ...rest },
  ref,
) {
  return (
    <span ref={ref} role="img" aria-label={name} className={cx('nd-avatar', `nd-avatar--${size}`, className)} {...rest}>
      {src ? <img className="nd-avatar__img" src={src} alt="" /> : <span aria-hidden="true">{initials(name)}</span>}
    </span>
  );
});
