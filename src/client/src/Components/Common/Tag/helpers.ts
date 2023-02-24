import { ReactNode } from 'react';

type Variant = 'success' | 'danger' | 'info' | 'warning';
export type TagProps = {
  children: ReactNode;
  onClick?: Function;
  variant?: Variant;
};
