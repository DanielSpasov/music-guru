import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, Input, Link, PageLayout } from '../../../Components';
import { SignInSchema } from '../../../Validations/User';
import { AuthContext } from '../../../Contexts/Auth';
import Api from '../../../Api';

export default function SignIn() {
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (formData: any) => {
      try {
        const { uid, token, data } = await Api.users.signIn({
          email: formData?.email,
          password: formData?.password
        });
        dispatch({ type: 'SIGNIN', payload: { uid, token, data } });
        toast.success('Successfully signed in');
        navigate('/');
      } catch (error) {
        toast.error('Failed to Sign In');
      }
    },
    [dispatch, navigate]
  );

  return (
    <PageLayout title="Sign In" hideHeader>
      <Form
        onSubmit={onSubmit}
        validationSchema={SignInSchema}
        className="m-auto"
        header="Sign In"
        additionalContent={
          <div className="text-center p-4">
            <span>Or</span>
            <Link type="link" to="/sign-up" className="underline p-1">
              sign up
            </Link>
            <span>if you don&apos;t have an account yet.</span>
          </div>
        }
      >
        <Input name="email" label="Email" type="email" required />
        <Input name="password" label="Password" type="password" required />
      </Form>
    </PageLayout>
  );
}
