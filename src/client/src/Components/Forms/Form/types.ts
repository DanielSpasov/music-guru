import { DeepPartial } from 'react-hook-form/dist/types';
import { FormHTMLAttributes, ReactNode } from 'react';
import { ZodSchema } from 'zod';

import { ButtonVariant } from '../../Common/Button/types';

export type SubmitFn<T> = (formData: T) => Promise<void> | void;

export type FormProps<T> = {
  onSubmit: SubmitFn<T>;
  onClose?: () => void;
  defaultValues?: DeepPartial<T>;
  header?: string;
  children?: ReactNode;
  validationSchema?: ZodSchema;
  additionalContent?: ReactNode;
  submitBtn?: {
    label?: string;
    variant?: ButtonVariant;
    disabled?: boolean;
  };
} & Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;
