import { UseFormSetValue } from 'react-hook-form';
import { IconModel } from '../../Common';

export type FieldProps<TValue = any, TComponentProps = any> = {
  validateField: (name: string, value: any) => void;
  onChange: (...event: any[]) => void;
  setValue: UseFormSetValue<any>;
  props: TComponentProps;
  value: TValue;
  label: string;
  name: string;
};

export type ControlsProps = {
  onClear: (props: any) => void;
  onClick: (props: any) => void;
  iconModel: IconModel;
  value: any;
};
