import { ReactNode } from 'react';

type Variant = 'danger' | 'info' | 'success' | 'warning';

export type TextProps = {
  children: ReactNode;
  variant?: Variant;
  [css: string]: any;
};
