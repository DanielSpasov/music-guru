import { Dispatch, ReactNode, SetStateAction } from 'react';

export type ModalProps = {
  children?: ReactNode;
  title?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  closeOnOutsideClick?: boolean;
};
