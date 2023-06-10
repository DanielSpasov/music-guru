import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

export type SelectProps = {
  setFormValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  props: {
    multiple?: boolean;
    fetchFn?: (props: any) => any;
  };
  validations: {
    required?: boolean;
  };
  label: string;
  name: string;
};
