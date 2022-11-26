import { Input } from '../../../Components';
import { FormSchema } from '../../../Types';

import { username } from './validators';

const schema: FormSchema = {
  fields: [
    {
      key: 'username',
      label: 'Username',
      type: 'text',
      Component: Input,
      validate: username
    },
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
    },
    {
      key: 'repeat-password',
      label: 'Repeat Password',
      type: 'password',
      Component: Input,
      required: true
    }
  ]
};

export default schema;
