import * as React from 'react';
import { cx } from '../../utils/cx.js';

export type TooltipPlacement = 'top' | 'bottom';

export interface TooltipProps {
  /** Texto curto. Não coloque informação essencial nem elementos interativos. */
  content: string;
  placement?: TooltipPlacement;
  /** Um único elemento focável que receberá aria-describedby. */
  children: React.ReactElement;
  className?: string;
}

/** Dica contextual (Figma: Tooltip — Placement Top e Bottom). Aparece no hover e no foco; Esc fecha. */
export function Tooltip({ content, placement = 'top', children, className }: TooltipProps) {
  const id = React.useId();
  const [open, setOpen] = React.useState(false);
  const child = React.Children.only(children) as React.ReactElement<Record<string, unknown>>;
  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  const trigger = React.cloneElement(child, {
    'aria-describedby': id,
    onMouseEnter: (e: React.MouseEvent) => { show(); (child.props.onMouseEnter as ((e: React.MouseEvent) => void) | undefined)?.(e); },
    onMouseLeave: (e: React.MouseEvent) => { hide(); (child.props.onMouseLeave as ((e: React.MouseEvent) => void) | undefined)?.(e); },
    onFocus: (e: React.FocusEvent) => { show(); (child.props.onFocus as ((e: React.FocusEvent) => void) | undefined)?.(e); },
    onBlur: (e: React.FocusEvent) => { hide(); (child.props.onBlur as ((e: React.FocusEvent) => void) | undefined)?.(e); },
    onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Escape') hide(); (child.props.onKeyDown as ((e: React.KeyboardEvent) => void) | undefined)?.(e); },
  });

  return (
    <span className={cx('nd-tooltip', className)}>
      {trigger}
      <span id={id} role="tooltip" hidden={!open} className={cx('nd-tooltip__box', `nd-tooltip__box--${placement}`)}>
        <span className="nd-tooltip__text">{content}</span>
        <span className="nd-tooltip__arrow" aria-hidden="true">{placement === 'top' ? '▾' : '▴'}</span>
      </span>
    </span>
  );
}
