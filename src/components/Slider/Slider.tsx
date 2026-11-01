import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Nome acessível (use este ou aria-labelledby). */
  'aria-label'?: string;
}

/** Controle deslizante de valor único, baseado em input range (Figma: Slider). */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { className, min = 0, max = 100, value, defaultValue = 50, onChange, style, ...rest },
  ref,
) {
  const [inner, setInner] = React.useState<number>(Number(defaultValue));
  const current = value !== undefined ? Number(value) : inner;
  const pct = ((current - Number(min)) / (Number(max) - Number(min))) * 100;
  return (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      value={current}
      onChange={(e) => {
        if (value === undefined) setInner(Number(e.target.value));
        onChange?.(e);
      }}
      className={cx('nd-slider', className)}
      style={{ ['--nd-slider-progress' as string]: `${pct}%`, ...style }}
      {...rest}
    />
  );
});
