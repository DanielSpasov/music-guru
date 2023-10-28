import { UseFormSetValue } from 'react-hook-form';

import { IconModel } from '../../../';

type AcceptTypes = 'image/png' | 'image/jpeg';

type InputType = 'password' | 'text' | 'email' | 'file';

type TextInputProps = {
  type?: Exclude<InputType, 'file'>;
};
type FileInputProps = {
  type?: Extract<InputType, 'file'>;
  accept: AcceptTypes[];
};

export type InputProps = TextInputProps | FileInputProps;

export type FileProps = {
  id: string;
  name: string;
  label: string;
  value: File;
  accept: AcceptTypes[];
  _onChange: (...event: any[]) => void;
};

export type UseInputProps = {
  type?: InputType;
  name: string;
  validateField: (name: string, value: any) => void;
  onChange: (...event: any[]) => void;
  setValue: UseFormSetValue<any>;
};

export type UseInputReturnType = {
  id: string;
  inputType: InputType;
  iconModel: IconModel;
  _onChange: (...event: any[]) => void;
  _onIconClick: () => void;
  _onClear: () => void;
};
