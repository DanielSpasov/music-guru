import { TextareaHTMLAttributes } from 'react';

export type TextareaProps = {
  label: string;
  name: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;
