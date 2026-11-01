import * as React from 'react';
import { cx } from '../../utils/cx.js';

export type ToastType = 'default' | 'success' | 'danger';

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  type?: ToastType;
  message: string;
  /** Ação opcional (ex.: Desfazer). */
  action?: { label: string; onClick: () => void };
  /** Quando definido, o toast se fecha após esse tempo (ms). Não definido no Figma; use com cuidado. */
  duration?: number;
  onClose?: () => void;
}

/** Notificação temporária escura, inversa ao tema (Figma: Toast — Default, Success e Danger). */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { type = 'default', message, action, duration, onClose, className, ...rest },
  ref,
) {
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const start = React.useCallback(() => {
    if (duration && onClose) timer.current = setTimeout(onClose, duration);
  }, [duration, onClose]);
  const stop = React.useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  React.useEffect(() => { start(); return stop; }, [start, stop]);

  return (
    <div
      ref={ref}
      role={type === 'danger' ? 'alert' : 'status'}
      className={cx('nd-toast', `nd-toast--${type}`, className)}
      onMouseEnter={stop}
      onMouseLeave={start}
      onFocus={stop}
      onBlur={start}
      {...rest}
    >
      <span className="nd-toast__content">
        <span className="nd-toast__dot" aria-hidden="true" />
        <span className="nd-toast__message">{message}</span>
      </span>
      {action ? <button type="button" className="nd-toast__action" onClick={action.onClick}>{action.label}</button> : null}
    </div>
  );
});
