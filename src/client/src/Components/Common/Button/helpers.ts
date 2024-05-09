import { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
} & React.HTMLAttributes<HTMLButtonElement>;

export const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary dark:bg-primary-dark dark px-3 py-1.5 rounded-lg text-white hover:opacity-70 disabled:opacity-60',
  secondary:
    'bg-secondary dark:bg-secondary-dark px-3 py-1.5 rounded-lg text-white hover:opacity-70 disabled:opacity-60',
  outline:
    'flex items-center border-2 rounded-full py-1 px-3 dark:shadow-md border-primary dark:border-neutral-900 [&>*]:text-primary dark:[&>*]:text-white hover:bg-primary dark:hover:bg-neutral-900 [&>*]:hover:text-white [&>svg>path]:hover:fill-white'
};
