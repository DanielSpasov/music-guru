import { Dispatch, ReactNode, SetStateAction } from 'react';

export type PopoverProps = {
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  label?: JSX.Element;
  title?: string;
  children?: ReactNode;
  [css: string]: any;
};
