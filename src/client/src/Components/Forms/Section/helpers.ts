import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';

import { FormError, FormField } from '../Form/helpers';

export type SectionProps = {
  title?: string;
  fields: FormField[];
  register: UseFormRegister<any>;
  getValues: UseFormGetValues<any>;
  setFormValue: UseFormSetValue<any>;
  errors: FormError[];
};
