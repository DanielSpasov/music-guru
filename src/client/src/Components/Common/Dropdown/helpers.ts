import { ReactNode } from 'react';

export type DropdownProps = {
  label: string;
  children: ReactNode;
  icon: string;
  openOnHover?: boolean;
  disabled?: boolean;
};
