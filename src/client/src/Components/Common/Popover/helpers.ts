import { ReactNode } from 'react';

export type PopoverProps = {
  open: boolean;
  label?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export const lightProps = 'bg-neutral-100';
export const darkProps = 'dark:bg-neutral-900 dark:shadow-black';
export const themeProps = `${lightProps} ${darkProps}`;
