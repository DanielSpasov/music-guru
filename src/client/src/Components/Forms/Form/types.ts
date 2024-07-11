import { DeepPartial } from 'react-hook-form/dist/types';
import { FormHTMLAttributes, ReactNode } from 'react';
import { ZodSchema } from 'zod';

export type SubmitFn<T> = (formData: T) => Promise<void> | void;

export type FormProps<T> = {
  onSubmit: SubmitFn<T>;
  defaultValues?: DeepPartial<T>;
  header?: string;
  submitLabel?: string;
  disableSubmit?: boolean;
  children?: ReactNode;
  validationSchema?: ZodSchema;
  additionalContent?: ReactNode;
} & Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;
