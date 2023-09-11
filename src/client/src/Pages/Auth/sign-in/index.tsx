import { useCallback, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, PageLayout, Box, Link, Text } from '../../../Components';
import { SignInData, SignInSchema } from '../helpers';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import Api from '../../../Api';
import schema from './schema';

export default function SignIn() {
  const { dispatch } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: SignInData) => {
      try {
        const validatedData = SignInSchema.parse(data);
        const { uid, token } = await Api.user.signIn(validatedData);
        dispatch({ type: 'SIGNIN', payload: { uid, token } });
        setErrors([]);
        navigate('/');
      } catch (error: any) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [navigate, dispatch]
  );

  return (
    <PageLayout title="Sign In" showHeader={false}>
      <Form
        header="Sign In"
        schema={schema}
        onSubmit={onSubmit}
        errors={errors}
        additionalInfo={
          <Box textAlign="center" padding="1em">
            <Text>Or</Text>
            <Link
              to="/sign-up"
              fontSize="1em"
              textDecoration="underline"
              display="inline"
            >
              sign up
            </Link>
            <Text>if you don&apos;t have an account yet.</Text>
          </Box>
        }
      />
    </PageLayout>
  );
}
