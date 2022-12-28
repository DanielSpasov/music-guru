import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, PageLayout } from '../../../Components';
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
        navigate('/');
        setErrors([]);
      } catch (error: any) {
        const handledErrors = errorHandler(error);
        setErrors(handledErrors);
      }
    },
    [navigate, setAuth]
  );

  return (
    <PageLayout title="Sign In" excludeNavbar excludeHeader>
      <Form
        header="Sign In"
        schema={schema}
        onSubmit={onSubmit}
        errors={errors}
      />
    </PageLayout>
  );
}
