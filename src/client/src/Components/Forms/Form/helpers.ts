import { FC } from 'react';
import {
  SubmitHandler,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form/dist/types';

import { InputType } from '../Fields/Input/helpers';

export type FormField = {
  key: string;
  label: string;
  Component: FC<any>;
  validations?: {
    required?: boolean;
  };
  props?: {
    type?: InputType;
    fetchFn?: (props: any) => any;
    multiple?: boolean;
  };
};

export type FormSection = {
  key: string;
  title?: string;
  fields: FormField[];
};

export type FormSchema = FormSection[];

export type FormError = {
  code: string;
  message: string;
  path: string[];
  exact?: boolean;
  inclusive?: boolean;
  minimum?: number;
  type?: string;
};

export type FormProps = {
  onSubmit: SubmitHandler<any>;
  schema: FormSchema;
  defaultValues?: any;
  header?: string;
  errors?: FormError[];
  additionalInfo?: JSX.Element;
};

export type FieldProps = {
  register: UseFormRegister<any>;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  field: FormField;
  error?: FormError;
};
