import { useCallback, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, PageLayout, Box, Link, Text } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { User } from '../../../Types';
import schema from './schema';

export default function SignIn() {
  const { signIn } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: Partial<User>) => {
      try {
        await signIn(data);
        setErrors([]);
        navigate('/');
      } catch (error: any) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [navigate, signIn]
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
