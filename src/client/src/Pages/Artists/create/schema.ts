import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { Input } from '../../../Components';

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
        label: 'Image',
        Component: Input,
        props: {
          type: 'file',
          accept: ['image/jpeg', 'image/png']
        },
        validations: {
          required: true
        }
      }
    ]
  }
];
