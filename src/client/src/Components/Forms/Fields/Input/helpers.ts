import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form/dist/types';

type AcceptTypes = 'image/png' | 'image/jpeg';

type TextProps = {
  type?: 'password' | 'text' | 'email';
};
type FileProps = {
  type?: 'file';
  accept: AcceptTypes[];
};

export type InputComponentProps = TextProps | FileProps;

export type InputProps = {
  register: UseFormRegister<any>;
  setFormValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  validations: {
    required?: boolean;
  };
  props: InputComponentProps;
  label: string;
  name: string;
};
