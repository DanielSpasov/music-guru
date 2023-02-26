import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

export type CalendarProps = {
  name: string;
  setFormValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
};
