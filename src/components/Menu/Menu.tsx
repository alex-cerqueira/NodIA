import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface MenuItemData {
  label: string;
  /** Com href renderiza um link; sem href, um botão. */
  href?: string;
  onSelect?: () => void;
  current?: boolean;
  disabled?: boolean;
}

export interface MenuItemProps extends MenuItemData {
  className?: string;
}

/** Item de menu (Figma: Menu Item — Default, Hover e Active). */
export function MenuItem({ label, href, onSelect, current, disabled, className }: MenuItemProps) {
  const cls = cx('nd-menu__item', current && 'nd-menu__item--active', className);
  return (
    <li className="nd-menu__li">
      {href ? (
        <a className={cls} href={href} aria-current={current ? 'page' : undefined} onClick={onSelect}>{label}</a>
      ) : (
        <button type="button" className={cls} aria-current={current ? 'true' : undefined} disabled={disabled} onClick={onSelect}>{label}</button>
      )}
    </li>
  );
}

export interface MenuProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  items: MenuItemData[];
  /** Nome da navegação para leitores de tela. */
  'aria-label': string;
}

/** Lista vertical de itens de navegação ou ação (Figma: Menu). */
export const Menu = React.forwardRef<HTMLElement, MenuProps>(function Menu({ items, className, ...rest }, ref) {
  return (
    <nav ref={ref} className={cx('nd-menu', className)} {...rest}>
      <ul className="nd-menu__list">
        {items.map((it) => <MenuItem key={it.label} {...it} />)}
      </ul>
    </nav>
  );
});
