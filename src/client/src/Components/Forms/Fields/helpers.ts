import { UseFormSetValue } from 'react-hook-form';

export type FieldProps<TValue = any, TComponentProps = any> = {
  validateField: (name: string, value: any) => void;
  onChange: (...event: any[]) => void;
  setValue: UseFormSetValue<any>;
  props: TComponentProps;
  value: TValue;
  label: string;
  name: string;
};
