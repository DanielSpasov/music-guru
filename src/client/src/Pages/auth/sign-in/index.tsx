import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, Input, PageLayout } from '../../../Components';
import { SignInSchema } from '../../../Validations/User';
import { AuthContext } from '../../../Contexts/Auth';
import Api from '../../../Api';

export default function SignIn() {
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (formData: any) => {
      try {
        const { uid, token } = await Api.users.signIn({
          email: formData?.email,
          password: formData?.password
        });
        dispatch({ type: 'SIGNIN', payload: { uid, token } });
        toast.success('Successfully signed in');
        navigate('/');
      } catch (error) {
        toast.error('Failed to Sign In');
      }
    },
    [dispatch, navigate]
  );

  return (
    <PageLayout title="Sign In" showHeader={false}>
      <Form
        onSubmit={onSubmit}
        validationSchema={SignInSchema}
        className="m-auto"
        header="Sign In"
      >
        <Input name="email" label="Email" type="email" />
        <Input name="password" label="Password" type="password" />
      </Form>
    </PageLayout>
  );
}
