import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface FieldBaseProps {
  /** Rótulo visível (obrigatório para acessibilidade). */
  label: string;
  /** Texto de apoio abaixo do campo. */
  helperText?: string;
  /** Mensagem de erro. Quando definida, o campo fica inválido e a mensagem substitui o apoio. */
  error?: string;
}

export interface TextFieldProps
  extends FieldBaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {}

/** Campo de texto de uma linha (Figma: Text Field — Default, Focus, Error e Disabled). */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, helperText, error, id, className, disabled, ...rest },
  ref,
) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const helpId = `${inputId}-help`;
  const hasHelp = Boolean(error || helperText);
  return (
    <div className={cx('nd-field', error && 'nd-field--error', disabled && 'nd-field--disabled', className)}>
      <label className="nd-field__label" htmlFor={inputId}>{label}</label>
      <div className="nd-field__box">
        <input
          ref={ref}
          id={inputId}
          className="nd-field__control"
          aria-invalid={error ? true : undefined}
          aria-describedby={hasHelp ? helpId : undefined}
          disabled={disabled}
          {...rest}
        />
      </div>
      {hasHelp ? (
        <p id={helpId} className="nd-field__help" role={error ? 'alert' : undefined}>{error ?? helperText}</p>
      ) : null}
    </div>
  );
});
