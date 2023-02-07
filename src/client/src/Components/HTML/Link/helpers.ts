import { ReactNode } from 'react';

export type LinkProps = {
  to: string;
  children: ReactNode;
  type?: 'navlink' | 'link';
  isActive?: boolean;
  className?: string;
  [css: string]: any;
};
