import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'role'> {
  label: React.ReactNode;
}

/** Interruptor liga/desliga de efeito imediato (Figma: Switch — On e State). */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, className, disabled, ...rest },
  ref,
) {
  return (
    <label className={cx('nd-choice', 'nd-switch', disabled && 'nd-choice--disabled', className)}>
      <input ref={ref} type="checkbox" role="switch" className="nd-choice__input" disabled={disabled} {...rest} />
      <span className="nd-switch__track" aria-hidden="true">
        <span className="nd-switch__knob" />
      </span>
      <span className="nd-choice__label">{label}</span>
    </label>
  );
});
