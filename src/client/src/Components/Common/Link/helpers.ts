import { ReactNode } from 'react';

export type LinkProps = {
  to: string;
  children: ReactNode;
  type?: 'navlink' | 'link';
  isActive?: boolean;
  className?: string;
  [css: string]: any;
};

export const lightProps = 'text-neutral-400';
export const darkProps = 'dark:text-white';
export const themeProps = `${lightProps} ${darkProps}`;

export const lightHoverProps = 'hover:text-primary';
export const darkHoverProps = 'dark:hover:text-primary-dark';
export const hoverProps = `${lightHoverProps} ${darkHoverProps}`;

export const lightActiveProps = 'text-neutral-950';
export const darkActiveProps = 'dark:text-primary-dark';
export const activeProps = `${lightActiveProps} ${darkActiveProps} font-bold`;
