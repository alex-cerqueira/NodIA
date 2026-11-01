import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface CarouselProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  slides: React.ReactNode[];
  /** Slide atual (controlado). */
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Nome do carrossel. */
  'aria-label': string;
}

/** Carrossel manual com indicadores e setas, sem rotação automática (Figma: Carousel). */
export const Carousel = React.forwardRef<HTMLElement, CarouselProps>(function Carousel(
  { slides, index, defaultIndex = 0, onIndexChange, className, 'aria-label': ariaLabel, ...rest },
  ref,
) {
  const [inner, setInner] = React.useState(defaultIndex);
  const current = index ?? inner;
  const count = slides.length;
  const go = (i: number) => {
    const next = (i + count) % count;
    if (index === undefined) setInner(next);
    onIndexChange?.(next);
  };
  return (
    <section ref={ref} aria-roledescription="carousel" aria-label={ariaLabel} className={cx('nd-carousel', className)} {...rest}>
      <div className="nd-carousel__viewport" aria-live="polite">
        {slides.map((s, i) => (
          <div key={i} role="group" aria-roledescription="slide" aria-label={`${i + 1} de ${count}`} hidden={i !== current} className="nd-carousel__slide">
            {s}
          </div>
        ))}
      </div>
      <div className="nd-carousel__controls">
        <div className="nd-carousel__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={cx('nd-carousel__dot', i === current && 'nd-carousel__dot--active')}
              aria-label={`Ir para o slide ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <div className="nd-carousel__arrows">
          <button type="button" className="nd-carousel__arrow" aria-label="Slide anterior" onClick={() => go(current - 1)}><span aria-hidden="true">←</span></button>
          <button type="button" className="nd-carousel__arrow" aria-label="Próximo slide" onClick={() => go(current + 1)}><span aria-hidden="true">→</span></button>
        </div>
      </div>
    </section>
  );
});
