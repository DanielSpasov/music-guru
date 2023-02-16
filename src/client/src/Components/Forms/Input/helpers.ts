import {
  Ref,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form/dist/types';

type Error = {
  type: string;
  message: string;
  ref: Ref;
};

export type File = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

export type InputType = 'password' | 'text' | 'email' | 'file' | 'select';

export type InputProps = {
  register: UseFormRegister<any>;
  setFormValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  type: InputType;
  label: string;
  name: string;
  error?: Error;
  required?: boolean;
  fetchFn?: Function;
};

export interface TextInputProps extends InputProps {
  passVisibility?: boolean;
}
