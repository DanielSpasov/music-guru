import { Props as MaskInputProps } from 'react-input-mask';

export type MaskFieldProps = {
  name: string;
  label: string;
} & MaskInputProps;
