import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

export type SelectProps = {
  setFormValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  required?: boolean;
  fetchFn: Function;
  multiple: boolean;
  label: string;
  name: string;
};
