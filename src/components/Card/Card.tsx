import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Imagem ou área visual de 140 px de altura. */
  media?: React.ReactNode;
  /** Meta em mono (ex.: "Caso 01"). */
  meta?: string;
  title: string;
  description?: string;
  /** Com href, o título vira o link e o cartão inteiro fica clicável. */
  href?: string;
  /** Nível do título (padrão 3). */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

/** Cartão de conteúdo (Figma: Card — Default e Hover). Hover vem de :hover. */
export const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
  { media, meta, title, description, href, headingLevel = 3, className, children, ...rest },
  ref,
) {
  const Heading = `h${headingLevel}` as 'h3';
  return (
    <article ref={ref} className={cx('nd-card', href && 'nd-card--interactive', className)} {...rest}>
      <div className="nd-card__media" aria-hidden={media ? undefined : true}>{media}</div>
      {meta ? <p className="nd-card__meta">{meta}</p> : null}
      <Heading className="nd-card__title">
        {href ? <a className="nd-card__link" href={href}>{title}</a> : title}
      </Heading>
      {description ? <p className="nd-card__description">{description}</p> : null}
      {children}
    </article>
  );
});
