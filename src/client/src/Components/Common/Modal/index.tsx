import { useEffect, useMemo, useRef } from 'react';

import { ModalProps } from './helpers';
import { Icon } from '../..';

export default function Modal({
  open,
  onClose,
  children,
  closeOnOutsideClick = false,
  showCloseButton = false,
  showCloseIcon = false
}: ModalProps) {
  const id = useMemo(() => `modal-${Math.random()}`, []); // TODO: This is tricky, please change

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const box = document.getElementById(id);
    if (!box) return;

    if (open) {
      box.classList.remove('hidden');
      setTimeout(() => {
        box.classList.remove('scale-0');
        box.classList.remove('opacity-0');
      }, 50);
    } else {
      box.classList.add('opacity-0');
      box.classList.add('scale-0');
      box.addEventListener('transitionend', () => box.classList.add('hidden'), {
        capture: false,
        once: true,
        passive: false
      });
    }
  }, [id, open]);

  return (
    <div
      className={`fixed top-0 w-full h-full ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div
        className={`bg-black h-full w-full ${
          open ? 'opacity-75' : 'opacity-0'
        }`}
        {...(closeOnOutsideClick ? { onClick: onClose } : {})}
      />
      <div
        id={id}
        className="absolute duration-500 m-auto inset-0 justify-center overflow-y-auto items-center bg-neutral-900 rounded-md w-1/2 h-2/3 shadow-black shadow-lg hidden opacity-0 scale-0"
      >
        {showCloseIcon && (
          <div className="absolute top-0 right-0">
            <Icon model="close" onClick={onClose} />
          </div>
        )}
        <div className="relative h-full">{children}</div>
        {showCloseButton && (
          <div className="flex justify-end">
            <button className="bg-red-500" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
