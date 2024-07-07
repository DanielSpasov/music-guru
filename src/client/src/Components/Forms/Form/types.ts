import { SubmitHandler } from 'react-hook-form/dist/types';
import { FormHTMLAttributes, ReactNode } from 'react';
import { ZodSchema } from 'zod';

export type FormProps = {
  onSubmit: SubmitHandler<any>;
  header?: string;
  defaultValues?: any;
  validationSchema?: ZodSchema;
  children?: ReactNode;
  additionalContent?: ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;
