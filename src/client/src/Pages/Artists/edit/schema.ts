import { Input } from '../../../Components';
import { FormSchema } from '../../../Components/Forms/Form/helpers';

export const schema: FormSchema = [
  {
    key: 'filter',
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
      }
    ]
  }
];
