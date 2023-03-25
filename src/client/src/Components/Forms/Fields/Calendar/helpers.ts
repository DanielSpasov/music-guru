import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

export type CalendarProps = {
  label: string;
  name: string;
  setFormValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
};
