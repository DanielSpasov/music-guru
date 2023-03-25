import { Input } from '../../../Components';
import { FormSchema } from '../../../Components/Forms/Form/helpers';

const schema: FormSchema = [
  {
    key: 'fields',
    fields: [
      {
        key: 'username',
        label: 'Username',
        Component: Input,
        props: {
          type: 'text'
        }
      },
      {
        key: 'email',
        label: 'Email',
        Component: Input,
        props: {
          type: 'email'
        },
        validations: {
          required: true
        }
      },
      {
        key: 'password',
        label: 'Password',
        Component: Input,
        props: {
          type: 'password'
        },
        validations: {
          required: true
        }
      },
      {
        key: 'repeat_password',
        label: 'Repeat Password',
        Component: Input,
        props: {
          type: 'password'
        },
        validations: {
          required: true
        }
      }
    ]
  }
];

export default schema;
