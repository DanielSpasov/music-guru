import { createPortal } from 'react-dom';

import { ModalProps } from './helpers';
import { Icon } from '../..';
import { useEffect, useRef } from 'react';

const darkProps = 'dark:bg-neutral-900 dark:shadow-black';
const lightProps = 'bg-neutral-100';
const themeProps = `${darkProps} ${lightProps}`;

export default function Modal({
  onClose,
  isOpen = false,
  title,
  showCloseIcon = true,
  children,
  className
}: ModalProps) {
  const firstOpen = useRef(true);

  useEffect(() => {
    if (!firstOpen.current) return;
    firstOpen.current = false;
  }, []);

  const showAnim = isOpen ? 'animate-pop-in' : 'animate-pop-out';
  const fadeAnim = isOpen ? 'animate-fade-in' : 'animate-fade-out';
  const show = isOpen ? 'animate-show' : 'animate-hide';

  return createPortal(
    <div
      className={`fixed top-0 w-full h-full z-50 ${
        firstOpen.current ? 'hidden' : show
      }`}
    >
      <div className={`bg-black w-full h-full ${fadeAnim}`} />
      <div
        className={`absolute duration-500 m-auto inset-0 justify-center items-center rounded-md max-w-2xl w-1/2 h-[calc(66%+48px)] shadow-md ${showAnim} ${themeProps} ${className}`}
      >
        <header className="flex items-center justify-between bg-neutral-900 opacity-100 w-full h-12 shadow-neutral-950 shadow-md rounded-t-md">
          <h3 className="m-0 pl-4">{title}</h3>
          {showCloseIcon && (
            <div className="top-0 right-0 z-50 p-2">
              <Icon model="close" onClick={onClose} />
            </div>
          )}
        </header>
        <div className="relative h-[calc(100%-48px)] overflow-y-auto">
          {isOpen ? children : null}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as Element
  );
}
