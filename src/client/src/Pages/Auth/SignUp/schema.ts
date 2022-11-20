import { Input } from '../../../Components';
import { FormSchema } from '../../../Types';

const schema: FormSchema = {
  fields: [
    {
      key: 'username',
      label: 'Username',
      type: 'text',
      Component: Input
    },
    {
      key: 'email',
      label: 'Email',
      type: 'email',
      Component: Input,
      validation: {
        required: true
      }
    },
    {
      key: 'password',
      label: 'Password',
      type: 'password',
      Component: Input,
      validation: {
        required: true
      }
    },
    {
      key: 'repeat-password',
      label: 'Repeat Password',
      type: 'password',
      Component: Input,
      validation: {
        required: true
      }
    }
  ],
  buttonText: 'Sign Up'
};

export default schema;
