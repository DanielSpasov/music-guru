import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, Input, Link, PageLayout } from '../../../Components';
import { SignUpSchema } from '../../../Validations/User';
import { AuthContext } from '../../../Contexts/Auth';
import Api from '../../../Api';

export default function SignUp() {
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (formData: any) => {
      try {
        const { uid, token } = await Api.users.signUp({
          email: formData?.email,
          password: formData?.password,
          repeat_password: formData?.repeat_password,
          username: formData?.username
        });
        dispatch({ type: 'SIGNIN', payload: { uid, token } });
        toast.success('Account created successfully');
        navigate('/');
      } catch (error) {
        toast.error('Failed to Sign Up');
      }
    },
    [dispatch, navigate]
  );

  return (
    <PageLayout title="Sign Up" showHeader={false}>
      <Form
        onSubmit={onSubmit}
        validationSchema={SignUpSchema}
        className="m-auto"
        header="Sign Up"
        additionalContent={
          <div className="text-center p-4">
            <span>Or</span>
            <Link to="/sign-in" className="underline p-1">
              sign in
            </Link>
            <span>if you already have an account.</span>
          </div>
        }
      >
        <Input name="username" label="Username" />
        <Input name="email" label="Email" type="email" required />
        <Input
          name="password"
          label="Password"
          type="password"
          sideEffect={(e, { trigger, formState }) => {
            if (formState.isSubmitted) trigger('repeat_password');
          }}
          required
        />
        <Input
          name="repeat_password"
          label="Repeat Password"
          type="password"
          required
        />
      </Form>
    </PageLayout>
  );
}
