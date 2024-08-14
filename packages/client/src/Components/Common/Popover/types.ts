import { ReactNode } from 'react';

export type PopoverProps = {
  open: boolean;
  label?: ReactNode;
  children?: ReactNode;
  className?: string;
  z?: string;
};
