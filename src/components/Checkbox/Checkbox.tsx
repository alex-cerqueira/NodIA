import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
}

/** Caixa de seleção independente (Figma: Checkbox — Checked e State). */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, disabled, ...rest },
  ref,
) {
  return (
    <label className={cx('nd-choice', 'nd-checkbox', disabled && 'nd-choice--disabled', className)}>
      <input ref={ref} type="checkbox" className="nd-choice__input" disabled={disabled} {...rest} />
      <span className="nd-choice__control nd-checkbox__box" aria-hidden="true">
        <span className="nd-checkbox__check">✓</span>
      </span>
      <span className="nd-choice__label">{label}</span>
    </label>
  );
});
