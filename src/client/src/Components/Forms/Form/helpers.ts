import {
  Control,
  SubmitHandler,
  UseFormSetValue
} from 'react-hook-form/dist/types';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ZodObject } from 'zod';
import { FC } from 'react';

import { TextareaProps } from '../Fields/Textarea/helpers';
import { SelectProps } from '../Fields/Select/helpers';
import { InputProps } from '../Fields/Input/helpers';

export type FormField = {
  key: string;
  label: string;
  Component: FC<any>;
  validations?: any;
  props?: InputProps | SelectProps | TextareaProps;
};

export type FormSection = {
  key: string;
  title: string;
  fields: FormField[];
};

export type OnSubmitProps = {
  formData: Record<string, any>;
  toast: typeof toast;
  navigate: NavigateFunction;
};

export type FormSchema = {
  sections: FormSection[];
  onSubmit: (props: OnSubmitProps) => Promise<void>;
  title: string;
  header?: string;
  validationSchema?: ZodObject<any>;
  fetchDefaultData?: () => Promise<Record<string, any>>;
};

export type FormProps = {
  onSubmit: SubmitHandler<any>;
  schema: FormSection[];
  header?: string;
  defaultValues?: any;
  validationSchema?: ZodObject<any>;
  additionalInfo?: JSX.Element;
  onClose?: (props?: any) => void;
  showClose?: boolean;
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

export type SectionProps = {
  title: string;
  fields: FormField[];
  validateField: (name: string, value: any) => void;
  setValue: UseFormSetValue<any>;
  control: Control;
};

export type FieldProps = {
  validateField: (name: string, value: any) => void;
  setValue: UseFormSetValue<any>;
  control: Control;
  field: FormField;
};
