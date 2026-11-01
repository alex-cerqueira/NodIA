import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface QuoteProps extends React.HTMLAttributes<HTMLElement> {
  /** Autoria exibida em mono. */
  author?: string;
  /** URL da fonte (atributo cite). */
  cite?: string;
}

/** Citação destacada com barra de acento (Figma: Quote). */
export const Quote = React.forwardRef<HTMLElement, QuoteProps>(function Quote(
  { author, cite, className, children, ...rest },
  ref,
) {
  return (
    <figure ref={ref} className={cx('nd-quote', className)} {...rest}>
      <blockquote className="nd-quote__text" cite={cite}>{children}</blockquote>
      {author ? <figcaption className="nd-quote__author">{author}</figcaption> : null}
    </figure>
  );
});
