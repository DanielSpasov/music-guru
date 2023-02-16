import { FC } from 'react';

import { SubmitHandler } from 'react-hook-form/dist/types';
import { InputType } from '../Input/helpers';

export type FormField = {
  key: string;
  label: string;
  Component: FC<any>;
  type?: InputType;
  required?: boolean;
  fetchFn?: Function;
};

export type FormError = {
  code: string;
  message: string;
  path: string[];
  exact?: boolean;
  inclusive?: boolean;
  minimum?: number;
  type?: string;
};

export type FormSchema = {
  fields: FormField[];
};

export type FormProps = {
  onSubmit: SubmitHandler<any>;
  schema: FormSchema;
  defaultValues?: any;
  header?: string;
  errors?: FormError[];
  additionalInfo?: JSX.Element;
};
