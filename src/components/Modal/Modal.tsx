import * as React from 'react';
import { cx } from '../../utils/cx.js';

export interface ModalProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, 'title' | 'open' | 'onClose'> {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Ações do rodapé (ex.: botões Cancelar e Confirmar). */
  footer?: React.ReactNode;
  closeLabel?: string;
}

/** Janela modal de confirmação, usando <dialog> nativo (Figma: Modal). Esc fecha; o foco fica preso. */
export const Modal = React.forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  { open, onClose, title, footer, closeLabel = 'Fechar', className, children, ...rest },
  ref,
) {
  const inner = React.useRef<HTMLDialogElement | null>(null);
  const titleId = React.useId();
  const setRefs = (node: HTMLDialogElement | null) => {
    inner.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLDialogElement | null>).current = node;
  };

  React.useEffect(() => {
    const dlg = inner.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      if (typeof dlg.showModal === 'function') dlg.showModal();
      else dlg.setAttribute('open', '');
    }
    if (!open && dlg.open) dlg.close();
  }, [open]);

  return (
    <dialog
      ref={setRefs}
      aria-labelledby={titleId}
      className={cx('nd-modal', className)}
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      onClose={() => { if (open) onClose(); }}
      {...rest}
    >
      <div className="nd-modal__header">
        <h2 id={titleId} className="nd-modal__title">{title}</h2>
        <button type="button" className="nd-modal__close" aria-label={closeLabel} onClick={onClose}><span aria-hidden="true">✕</span></button>
      </div>
      <div className="nd-modal__body">{children}</div>
      {footer ? <div className="nd-modal__footer">{footer}</div> : null}
    </dialog>
  );
});
