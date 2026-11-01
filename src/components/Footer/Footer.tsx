import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface FooterLinkGroup {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export interface FooterProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Logotipo (ex.: <Logo />). */
  logo: React.ReactNode;
  groups?: FooterLinkGroup[];
  /** Linha de direitos (ex.: "© Alex Cerqueira"). */
  legal?: React.ReactNode;
  /** Elementos à direita da linha de base (ex.: <ThemeToggle />). */
  actions?: React.ReactNode;
}

/** Rodapé com logotipo, colunas de links e linha de direitos (Figma: Footer). */
export const Footer = React.forwardRef<HTMLElement, FooterProps>(function Footer(
  { logo, groups = [], legal, actions, className, ...rest },
  ref,
) {
  return (
    <footer ref={ref} className={cx('nd-footer', className)} {...rest}>
      <div className="nd-footer__top">
        <div className="nd-footer__logo">{logo}</div>
        <div className="nd-footer__groups">
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title} className="nd-footer__group">
              <p className="nd-footer__group-title">{g.title}</p>
              <ul className="nd-footer__links">
                {g.links.map((l) => <li key={l.href}><a className="nd-footer__link" href={l.href}>{l.label}</a></li>)}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="nd-footer__bottom">
        {legal ? <p className="nd-footer__legal">{legal}</p> : <span />}
        {actions}
      </div>
    </footer>
  );
});
