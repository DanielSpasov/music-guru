import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { User, userSchema } from '../../../Types';
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
        const user = userSchema.parse(data);
        const { token, uid } = await Api.user.signUp(user);
        localStorage.setItem('AUTH', token);
        setAuth({ isAuthenticated: true, uid: uid });
        navigate('/');
      } catch (error: any) {
        const handledErrors = errorHandler(error);
        if (handledErrors.length) setErrors(handledErrors);
      }
    },
    [navigate, setAuth]
  );

  return (
    <PageLayout title="Sign Up" excludeNavbar excludeHeader>
      <Form
        header="Sign Up"
        schema={schema}
        onSubmit={onSubmit}
        errors={errors}
      />
    </PageLayout>
  );
}
