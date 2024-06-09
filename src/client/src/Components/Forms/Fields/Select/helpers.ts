import { SelectHTMLAttributes } from 'react';

export type SelectProps = {
  label: string;
  name: string;
  fetchFn: ({ config }: any) => Promise<{ data: any[] }>;
  hideSearch?: boolean;
  multiple?: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;
