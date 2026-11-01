import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface TableColumn<T> {
  key: keyof T & string;
  header: string;
  /** Largura em px (o Figma usa 180, 140 e 140). */
  width?: number;
  align?: 'start' | 'end';
}

export interface TableProps<T extends Record<string, React.ReactNode>>
  extends Omit<React.TableHTMLAttributes<HTMLTableElement>, 'children'> {
  columns: TableColumn<T>[];
  rows: T[];
  /** Legenda da tabela (acessível; use visuallyHiddenCaption para ocultá-la). */
  caption?: string;
  visuallyHiddenCaption?: boolean;
}

/** Tabela de dados com cabeçalho em mono (Figma: Table). */
export function Table<T extends Record<string, React.ReactNode>>({
  columns, rows, caption, visuallyHiddenCaption, className, ...rest
}: TableProps<T>) {
  return (
    <div className="nd-table__scroll" tabIndex={0} role="region" aria-label={caption}>
      <table className={cx('nd-table', className)} {...rest}>
        {caption ? <caption className={visuallyHiddenCaption ? 'nd-visually-hidden' : 'nd-table__caption'}>{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" style={{ width: c.width, textAlign: c.align }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {columns.map((c) => <td key={c.key} style={{ textAlign: c.align }}>{r[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
