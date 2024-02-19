import { ReactNode } from 'react';

export type ModalProps = {
  onClose: () => void;
  title?: string;
  isOpen?: boolean;
  children?: ReactNode;
  showCloseIcon?: boolean;
  className?: string;
};
