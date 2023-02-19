import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { FormError } from '../Form/helpers';

export type SelectProps = {
  setFormValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  required?: boolean;
  fetchFn: Function;
  error: FormError;
  label: string;
  name: string;
};
