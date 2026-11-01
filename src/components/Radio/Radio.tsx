import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
}

/**
 * Opção única dentro de um grupo (Figma: Radio). Agrupe radios com o mesmo `name`
 * dentro de um <fieldset> com <legend>; o grupo ainda não existe como componente no Figma.
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, className, disabled, ...rest },
  ref,
) {
  return (
    <label className={cx('nd-choice', 'nd-radio', disabled && 'nd-choice--disabled', className)}>
      <input ref={ref} type="radio" className="nd-choice__input" disabled={disabled} {...rest} />
      <span className="nd-choice__control nd-radio__circle" aria-hidden="true">
        <span className="nd-radio__dot" />
      </span>
      <span className="nd-choice__label">{label}</span>
    </label>
  );
});
