import { Ref, UseFormRegister } from 'react-hook-form/dist/types';

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

export type InputType = 'password' | 'text' | 'email' | 'file';

export type InputProps = {
  register: UseFormRegister<any>;
  required?: boolean;
  type: InputType;
  label: string;
  name: string;
  error?: Error;
};

export interface TextInputProps extends InputProps {
  passVisibility?: boolean;
}
