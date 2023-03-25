import { ReactNode } from 'react';

export type DropdownProps = {
  label: string;
  children: ReactNode;
  icon: {
    model: string;
    type: string;
  };
  openOnHover?: boolean;
  disabled?: boolean;
};
