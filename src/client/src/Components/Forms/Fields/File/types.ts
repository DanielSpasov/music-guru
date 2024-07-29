import { InputHTMLAttributes } from 'react';

export type FileProps = {
  label: string;
  name: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;
