import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface HeaderLink {
  label: string;
  href: string;
  current?: boolean;
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Logotipo (ex.: <Logo />). */
  logo: React.ReactNode;
  /** Link principais de navegação. */
  links?: HeaderLink[];
  /** Ações à direita (ThemeToggle, Button...). No mobile ficam sempre visíveis. */
  actions?: React.ReactNode;
  navLabel?: string;
  menuLabel?: string;
}

/** Cabeçalho do site (Figma: Header — Desktop e Mobile). Abaixo de 720 px os links viram "Menu". */
export const Header = React.forwardRef<HTMLElement, HeaderProps>(function Header(
  { logo, links = [], actions, navLabel = 'Principal', menuLabel = 'Menu', className, ...rest },
  ref,
) {
  const [open, setOpen] = React.useState(false);
  const navId = React.useId();
  return (
    <header ref={ref} className={cx('nd-header', open && 'nd-header--open', className)} {...rest}>
      <div className="nd-header__logo">{logo}</div>
      <nav id={navId} className="nd-header__nav" aria-label={navLabel}>
        <ul className="nd-header__links">
          {links.map((l) => (
            <li key={l.href}>
              <a className="nd-header__link" href={l.href} aria-current={l.current ? 'page' : undefined}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="nd-header__actions">
        {actions}
        {links.length ? (
          <button type="button" className="nd-header__menu-button" aria-expanded={open} aria-controls={navId} onClick={() => setOpen((o) => !o)}>
            {menuLabel}
          </button>
        ) : null}
      </div>
    </header>
  );
});
