import * as React from 'react';
import { cx } from '../../utils/cx.js';

export type Theme = 'light' | 'dark';

export interface ThemeToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'> {
  /** Tema atual (controlado). Omita para usar estado interno. */
  theme?: Theme;
  defaultTheme?: Theme;
  onThemeChange?: (theme: Theme) => void;
  /** Aplica data-theme em document.documentElement. Padrão: true. */
  applyToDocument?: boolean;
}

/** Alternador entre os temas Light e Dark (Figma: Theme Toggle — Mode). */
export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(function ThemeToggle(
  {
    theme,
    defaultTheme = 'dark',
    onThemeChange,
    applyToDocument = true,
    className,
    'aria-label': ariaLabel = 'Tema escuro',
    ...rest
  },
  ref,
) {
  const [inner, setInner] = React.useState<Theme>(defaultTheme);
  const current = theme ?? inner;

  React.useEffect(() => {
    if (applyToDocument && typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', current);
    }
  }, [current, applyToDocument]);

  const toggle = () => {
    const next: Theme = current === 'dark' ? 'light' : 'dark';
    if (theme === undefined) setInner(next);
    onThemeChange?.(next);
  };

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={current === 'dark'}
      aria-label={ariaLabel}
      data-mode={current}
      className={cx('nd-theme-toggle', className)}
      onClick={toggle}
      {...rest}
    >
      <span className="nd-theme-toggle__knob" aria-hidden="true" />
    </button>
  );
});
