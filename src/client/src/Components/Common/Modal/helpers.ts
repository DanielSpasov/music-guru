import { ReactNode } from 'react';

export type ModalProps = {
  onClose: () => void;
  children?: ReactNode;
  showCloseIcon?: boolean;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
};
