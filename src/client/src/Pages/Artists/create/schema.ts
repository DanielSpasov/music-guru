import { Input } from '../../../Components';
import { FormSchema } from '../../../Components/Forms/Form/helpers';

export const schema: FormSchema = [
  {
    key: 'fields',
    fields: [
      {
        key: 'name',
        label: 'Name',
        Component: Input,
        props: {
          type: 'text'
        },
        validations: {
          required: true
        }
      },
      {
        key: 'image',
        label: 'Image URL',
        Component: Input,
        props: {
          type: 'text'
        },
        validations: {
          required: true
        }
      }
    ]
  }
];
