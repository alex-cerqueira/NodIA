import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface StepsProps extends Omit<React.HTMLAttributes<HTMLOListElement>, 'children'> {
  steps: string[];
  /** Índice da etapa atual, a partir de 0. As anteriores ficam concluídas. */
  current: number;
}

/** Passos de um processo com conectores (Figma: Steps e Step — Done, Current e Upcoming). */
export const Steps = React.forwardRef<HTMLOListElement, StepsProps>(function Steps(
  { steps, current, className, ...rest },
  ref,
) {
  return (
    <ol ref={ref} className={cx('nd-steps', className)} {...rest}>
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'upcoming';
        return (
          <li key={label} className={cx('nd-step', `nd-step--${state}`)} aria-current={state === 'current' ? 'step' : undefined}>
            <span className="nd-step__marker" aria-hidden="true">{state === 'done' ? '✓' : i + 1}</span>
            <span className="nd-step__label">{label}</span>
            <span className="nd-visually-hidden">{state === 'done' ? ' (concluída)' : state === 'current' ? ' (atual)' : ' (próxima)'}</span>
            {i < steps.length - 1 ? <span className="nd-step__connector" aria-hidden="true" /> : null}
          </li>
        );
      })}
    </ol>
  );
});
