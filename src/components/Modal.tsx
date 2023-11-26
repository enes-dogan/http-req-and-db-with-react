import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalProps } from '../types';

function Modal({ open, children, onClose }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialog.current!.showModal();
    } else {
      dialog.current!.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')!
  );
}

export default Modal;
