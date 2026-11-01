import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  /** Lista numerada (01, 02, 03) em vez de traço. */
  ordered?: boolean;
}

/** Lista com marcador em traço ou numerada em mono (Figma: List — Ordered). Filhos devem ser <li>. */
export const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(function List(
  { ordered = false, className, ...rest },
  ref,
) {
  const cls = cx('nd-list', ordered && 'nd-list--ordered', className);
  return ordered ? (
    <ol ref={ref as React.Ref<HTMLOListElement>} className={cls} {...rest} />
  ) : (
    <ul ref={ref as React.Ref<HTMLUListElement>} className={cls} {...rest} />
  );
});
