import * as React from 'react';
import { cx } from '../../utils/cx.js';
import type { FieldBaseProps } from '../TextField/TextField.js';

export interface TextareaProps
  extends FieldBaseProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/** Campo de texto multilinha, altura mínima de 96 px (Figma: Textarea). */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, helperText, error, id, className, disabled, rows = 4, ...rest },
  ref,
) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const helpId = `${inputId}-help`;
  const hasHelp = Boolean(error || helperText);
  return (
    <div className={cx('nd-field', 'nd-field--textarea', error && 'nd-field--error', disabled && 'nd-field--disabled', className)}>
      <label className="nd-field__label" htmlFor={inputId}>{label}</label>
      <div className="nd-field__box">
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
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
