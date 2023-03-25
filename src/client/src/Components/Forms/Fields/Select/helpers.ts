import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

export type SelectProps = {
  setFormValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  props: {
    multiple?: boolean;
    fetchFn?: Function;
  };
  validations: {
    required?: boolean;
  };
  label: string;
  name: string;
};
