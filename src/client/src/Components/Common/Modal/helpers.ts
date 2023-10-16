import { ReactNode } from 'react';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  showCloseIcon?: boolean;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
};
