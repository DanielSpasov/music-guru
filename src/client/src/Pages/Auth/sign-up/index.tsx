import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Form, Link, PageLayout, Text } from '../../../Components';
import { SignUpData, SignUpSchema } from '../helpers';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import Api from '../../../Api';
import schema from './schema';

export default function SignUp() {
  const { dispatch } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: SignUpData) => {
      try {
        const validatedData = SignUpSchema.parse(data);
        const { uid, token } = await Api.user.signUp(validatedData);
        dispatch({ type: 'SIGNUP', payload: { uid, token } });
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
    <PageLayout title="Sign Up" showHeader={false}>
      <Form
        header="Sign Up"
        schema={schema}
        onSubmit={onSubmit}
        errors={errors}
        additionalInfo={
          <Box textAlign="center" padding="1em">
            <Text>Or</Text>
            <Link
              to="/sign-in"
              fontSize="1em"
              textDecoration="underline"
              display="inline"
            >
              sign in
            </Link>
            <Text>if you already have an account.</Text>
          </Box>
        }
      />
    </PageLayout>
  );
}
