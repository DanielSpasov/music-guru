import { HTMLAttributes, ReactNode } from 'react';

export type CategoryProps = {
  title?: string;
  children?: ReactNode;
  separate?: boolean | null;
} & HTMLAttributes<HTMLDivElement>;
