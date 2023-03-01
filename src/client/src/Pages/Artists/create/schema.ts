import { Input } from '../../../Components';
import { FormSchema } from '../../../Components/Forms/Form/helpers';

export const schema: FormSchema = [
  {
    title: 'Details',
    key: 'details',
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
      }
    ]
  }
];
