import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { Input } from '../../../Components';

export const schema: FormSchema = {
  fields: [
    {
      key: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      Component: Input
    },
    {
      key: 'image',
      type: 'text',
      label: 'Image URL',
      required: true,
      Component: Input
    },
    {
      key: 'artist',
      type: 'select',
      label: 'Artist',
      required: true,
      Component: Input
    }
  ]
};
