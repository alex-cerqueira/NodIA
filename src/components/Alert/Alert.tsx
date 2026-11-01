import * as React from 'react';
import { cx } from '../../utils/cx.js';

export type AlertType = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: AlertType;
  title: string;
}

const GLYPH: Record<AlertType, string> = { info: 'i', success: '✓', warning: '!', danger: '×' };

/** Alerta inline (Figma: Alert — Info, Success, Warning e Danger). danger e warning usam role="alert". */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { type = 'info', title, className, children, ...rest },
  ref,
) {
  const role = type === 'danger' || type === 'warning' ? 'alert' : 'status';
  return (
    <div ref={ref} role={role} className={cx('nd-alert', `nd-alert--${type}`, className)} {...rest}>
      <span className="nd-alert__icon" aria-hidden="true">{GLYPH[type]}</span>
      <div className="nd-alert__body">
        <p className="nd-alert__title">{title}</p>
        {children ? <div className="nd-alert__description">{children}</div> : null}
      </div>
    </div>
  );
});
