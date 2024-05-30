import { InputHTMLAttributes } from 'react';

export type InputProps = {
  label: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;
