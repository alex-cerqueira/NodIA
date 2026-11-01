import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  items: AccordionItem[];
  /** Permite vários itens abertos ao mesmo tempo. Padrão: false (comportamento ainda a validar no Figma). */
  multiple?: boolean;
  defaultOpen?: string[];
  /** Nível do título de cada item. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

/** Acordeão expansível (Figma: Accordion — Closed e Open). */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { items, multiple = false, defaultOpen = [], headingLevel = 3, className, ...rest },
  ref,
) {
  const base = React.useId();
  const [open, setOpen] = React.useState<string[]>(defaultOpen);
  const Heading = `h${headingLevel}` as 'h3';
  const toggle = (id: string) =>
    setOpen((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : multiple ? [...cur, id] : [id]));
  return (
    <div ref={ref} className={cx('nd-accordion', className)} {...rest}>
      {items.map((it) => {
        const isOpen = open.includes(it.id);
        return (
          <div key={it.id} className="nd-accordion__item">
            <Heading className="nd-accordion__heading">
              <button
                type="button"
                id={`${base}-btn-${it.id}`}
                className="nd-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={`${base}-panel-${it.id}`}
                onClick={() => toggle(it.id)}
              >
                <span>{it.title}</span>
                <span className="nd-accordion__indicator" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
            </Heading>
            <div id={`${base}-panel-${it.id}`} role="region" aria-labelledby={`${base}-btn-${it.id}`} hidden={!isOpen} className="nd-accordion__panel">
              {it.content}
            </div>
          </div>
        );
      })}
    </div>
  );
});
