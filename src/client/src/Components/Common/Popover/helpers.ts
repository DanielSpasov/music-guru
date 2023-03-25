import { ReactNode } from 'react';

export type PopoverProps = {
  children?: ReactNode;
  open: boolean;
  [css: string]: any;
};
