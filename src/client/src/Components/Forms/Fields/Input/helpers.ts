import { UseFormRegister } from 'react-hook-form/dist/types';

export type InputType = 'password' | 'text' | 'email' | 'file';

export type InputProps = {
  register: UseFormRegister<any>;
  validations: {
    required?: boolean;
  };
  props: {
    type?: InputType;
  };
  label: string;
  name: string;
};
