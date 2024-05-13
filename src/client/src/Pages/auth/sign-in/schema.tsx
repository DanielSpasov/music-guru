import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { SignInSchema } from '../../../Validations/User';
import { Input, Link } from '../../../Components';
import Api from '../../../Api';

export const schema: FormSchema = {
  title: 'Sign In',
  header: 'Sign In',
  onSubmit: async ({ formData, ctx, navigate, toast }) => {
    try {
      const { uid, token } = await Api.users.signIn({
        email: formData?.email,
        password: formData?.password
      });
      ctx.dispatch({ type: 'SIGNIN', payload: { uid, token } });
      toast.success('Successfully signed in');
      navigate('/');
    } catch (error) {
      toast.error('Failed to Sign In');
    }
  },
  validationSchema: SignInSchema,
  sections: [
    {
      key: 'fields',
      title: 'Account Information',
      fields: [
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
        }
      ]
    }
  ],
  additionalInfo: (
    <div className="text-center p-4">
      <span>Or</span>
      <Link to="/sign-up" className="underline p-1">
        sign up
      </Link>
      <span>if you don&apos;t have an account yet.</span>
    </div>
  )
};
