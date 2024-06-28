import { ReactNode } from 'react';

export type DetailsProps = {
  children?: ReactNode;
  label: string;
  open?: boolean;
};

export const hoverProps = 'hover:bg-neutral-300';
export const darkProps = 'dark:bg-neutral-700 dark:hover:bg-neutral-600';
