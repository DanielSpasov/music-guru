import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { Input, Link } from '../../../Components';
import { SignUpSchema } from '../helpers';
import Api from '../../../Api';

export const schema: FormSchema = {
  title: 'Sign Up',
  header: 'Sign Up',
  onSubmit: async ({ formData, toast, navigate, ctx }) => {
    try {
      const { uid, token } = await Api.user.signUp({
        email: formData?.email,
        password: formData?.password,
        repeat_password: formData?.repeat_password,
        username: formData?.username
      });
      ctx.dispatch({ type: 'SIGNUP', payload: { uid, token } });
      navigate('/');
    } catch (error) {
      toast.error('Failed to Sign Up');
    }
  },
  validationSchema: SignUpSchema,
  sections: [
    {
      title: 'Account Information',
      key: 'account-information',
      fields: [
        {
          key: 'username',
          label: 'Username',
          Component: Input,
          props: { type: 'text' }
        },
        {
          key: 'email',
          label: 'Email',
          Component: Input,
          props: { type: 'email' },
          validations: {
            required: {
              value: true,
              message: 'Email is required.'
            }
          }
        },
        {
          key: 'password',
          label: 'Password',
          Component: Input,
          props: { type: 'password' },
          validations: {
            required: {
              value: true,
              message: 'Password is required.'
            }
          }
        },
        {
          key: 'repeat_password',
          label: 'Repeat Password',
          Component: Input,
          props: { type: 'password' },
          validations: {
            required: {
              value: true,
              message: 'Repeat Password is required.'
            }
          }
        }
      ]
    }
  ],
  additionalInfo: (
    <div className="text-center p-4">
      <span>Or</span>
      <Link to="/sign-in" className="underline p-1">
        sign in
      </Link>
      <span>if you already have an account.</span>
    </div>
  )
};
