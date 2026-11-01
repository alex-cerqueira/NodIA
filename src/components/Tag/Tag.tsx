import * as React from 'react';
import { cx } from '../../utils/cx.js';

export type TagVariant = 'neutral' | 'accent' | 'outline';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
}

/** Etiqueta em pílula (Figma: Tag — Neutral, Accent e Outline). Não é clicável. */
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { variant = 'neutral', className, ...rest },
  ref,
) {
  return <span ref={ref} className={cx('nd-tag', `nd-tag--${variant}`, className)} {...rest} />;
});
