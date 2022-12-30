import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Form, Link, PageLayout, Text } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { User, SignUpSchema } from '../../../Types';
import { errorHandler } from '../../../Handlers';
import Api from '../../../Api';
import schema from './schema';

export default function SignUp() {
  const { setAuth } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: User) => {
      try {
        const user = SignUpSchema.parse(data);
        const { token, uid } = await Api.user.signUp(user);
        localStorage.setItem('AUTH', token);
        setAuth({ isAuthenticated: true, uid: uid });
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
    <PageLayout title="Sign Up" showHeader={false}>
      <Form
        header="Sign Up"
        schema={schema}
        onSubmit={onSubmit}
        errors={errors}
        additionalInfo={
          <Box fontSize="1em" textAlign="center" padding="1em">
            <Text>Or</Text>
            <Link to="/sign-in" fontSize="1em" textDecoration="underline">
              sign in
            </Link>
            <Text>if you already have an account.</Text>
          </Box>
        }
      />
    </PageLayout>
  );
}
