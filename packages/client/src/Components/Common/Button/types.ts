import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  'data-testid'?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
