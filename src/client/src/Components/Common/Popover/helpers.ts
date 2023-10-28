import { ReactNode } from 'react';

export type PopoverProps = {
  open: boolean;
  label?: JSX.Element;
  children?: ReactNode;
  className?: string;
};
