import { ReactNode } from 'react';

type Variant = 'success' | 'danger' | 'info' | 'warning';
export type TagProps = {
  children: ReactNode;
  onRemove?: (props: any) => any;
  variant?: Variant;
};
