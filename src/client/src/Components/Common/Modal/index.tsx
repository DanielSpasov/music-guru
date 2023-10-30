import { ModalProps } from './helpers';
import { Icon } from '../..';

const darkProps = 'dark:bg-neutral-900 dark:shadow-neutral-950';

export default function Modal({
  onClose,
  children,
  closeOnOutsideClick = false,
  showCloseButton = false,
  showCloseIcon = false,
  className
}: ModalProps) {
  return (
    <div className="fixed top-0 w-full h-full">
      <div
        className="bg-black w-full h-full opacity-75"
        {...(closeOnOutsideClick ? { onClick: onClose } : {})}
      />
      <div
        className={`absolute duration-500 m-auto inset-0 justify-center overflow-y-auto items-center bg-neutral-100 rounded-md w-1/2 h-2/3 shadow-md ${className} ${darkProps}`}
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
