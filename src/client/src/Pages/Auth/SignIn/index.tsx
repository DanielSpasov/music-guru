import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, PageLayout, Box, Link, Text } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { User, SignInSchema } from '../../../Types';
import { errorHandler } from '../../../Handlers';
import Api from '../../../Api';
import schema from './schema';

export default function SignIn() {
  const { setAuth } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: Partial<User>) => {
      try {
        const user = SignInSchema.parse(data);
        const { token, uid } = await Api.user.signIn(user);
        localStorage.setItem('AUTH', token);
        setAuth({ isAuthenticated: true, uid });
        setErrors([]);
        navigate('/');
      } catch (error: any) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [navigate, setAuth]
  );

  return (
    <PageLayout title="Sign In" showHeader={false}>
      <Form
        header="Sign In"
        schema={schema}
        onSubmit={onSubmit}
        errors={errors}
        additionalInfo={
          <Box fontSize="1em" textAlign="center" padding="1em">
            <Text>Or</Text>
            <Link to="/sign-up" fontSize="1em" textDecoration="underline">
              sign up
            </Link>
            <Text>if you don't have an account yet.</Text>
          </Box>
        }
      />
    </PageLayout>
  );
}
