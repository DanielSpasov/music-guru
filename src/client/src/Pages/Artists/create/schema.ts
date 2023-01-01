import { Input } from '../../../Components';
import { FormSchema } from '../../../Types';

export const schema: FormSchema = {
  fields: [
    {
      key: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      Component: Input
    }
  ]
};
