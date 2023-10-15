import { ReactNode } from 'react';

export type ModalProps = {
  open: boolean;
  type?: 'alert' | 'form';
  onClose: () => void;
  children?: ReactNode;
  showCloseIcon?: boolean;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
};
