import { ReactNode } from 'react';

export type HeaderProps = {
  title: string;
  children?: ReactNode;
  [css: string]: any;
};
