import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Form, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { User } from '../../../Types';
import Api from '../../../Api';
import schema from './schema';

const UserSchema = z.object({
  email: z.string().email({ message: 'Invalid email.' }),
  password: z.string()
});

export default function SignIn() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: Partial<User>) => {
      try {
        const user = UserSchema.parse(data);
        const { token, uid } = await Api.user.signIn(user);
        localStorage.setItem('AUTH', token);
        setAuth({ isAuthenticated: true, uid });
        navigate('/');
      } catch (error: any) {
        errorHandler(error);
      }
    },
    [navigate, setAuth]
  );

  return (
    <PageLayout title="Sign In" excludeNavbar excludeHeader>
      <Form header="Sign In" schema={schema} onSubmit={onSubmit} />
    </PageLayout>
  );
}
