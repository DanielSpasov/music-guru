import { Props as MaskInputProps } from 'react-input-mask';

export type MaskProps = {
  name: string;
  label: string;
} & MaskInputProps;
