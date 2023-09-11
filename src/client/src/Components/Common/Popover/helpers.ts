import { Dispatch, ReactNode, SetStateAction } from 'react';

export type PopoverProps = {
  children?: ReactNode;
  open: boolean;
  title?: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  [css: string]: any;
};
