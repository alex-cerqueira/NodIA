import * as React from 'react';
import { cx } from '../../utils/cx.js';
import type { FieldBaseProps } from '../TextField/TextField.js';

export interface SelectProps
  extends FieldBaseProps,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Texto da opção inicial vazia (ex.: "Selecione uma opção"). */
  placeholder?: string;
}

/** Seleção de uma opção. Usa select nativo (Figma: Select — Default, Focus e Disabled). */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, helperText, error, id, className, disabled, placeholder, children, defaultValue, value, ...rest },
  ref,
) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const helpId = `${inputId}-help`;
  const hasHelp = Boolean(error || helperText);
  const valueProps = value !== undefined ? { value } : { defaultValue: defaultValue ?? (placeholder ? '' : undefined) };
  return (
    <div className={cx('nd-field', 'nd-field--select', error && 'nd-field--error', disabled && 'nd-field--disabled', className)}>
      <label className="nd-field__label" htmlFor={inputId}>{label}</label>
      <div className="nd-field__box">
        <select
          ref={ref}
          id={inputId}
          className="nd-field__control"
          aria-invalid={error ? true : undefined}
          aria-describedby={hasHelp ? helpId : undefined}
          disabled={disabled}
          {...valueProps}
          {...rest}
        >
          {placeholder ? <option value="" disabled>{placeholder}</option> : null}
          {children}
        </select>
        <span className="nd-field__chevron" aria-hidden="true">▾</span>
      </div>
      {hasHelp ? (
        <p id={helpId} className="nd-field__help" role={error ? 'alert' : undefined}>{error ?? helperText}</p>
      ) : null}
    </div>
  );
});
