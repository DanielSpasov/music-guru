import { FieldsetHTMLAttributes } from 'react';

export type FieldsetProps = {
  foldable?: boolean;
  title?: string;
} & FieldsetHTMLAttributes<HTMLFieldSetElement>;
