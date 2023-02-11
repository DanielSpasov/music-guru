import { Input } from '../../../Components';
import { FormSchema } from '../../../Components/Forms/Form/helpers';

const schema: FormSchema = {
  fields: [
    {
      key: 'email',
      label: 'Email',
      type: 'email',
      Component: Input,
      required: true
    },
    {
      key: 'password',
      label: 'Password',
      type: 'password',
      Component: Input,
      required: true
    }
  ]
};

export default schema;
