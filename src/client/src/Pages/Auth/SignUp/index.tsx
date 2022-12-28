import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Form, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { User } from '../../../Types';
import Api from '../../../Api';
import schema from './schema';

const UserSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: 'Username is too short.' })
      .max(16, { message: 'Username is too long.' })
      .optional(),
    email: z.string().email({ message: 'Invalid email.' }),
    password: z.string(),
    repeatPassword: z.string()
  })
  .superRefine(({ repeatPassword, password }, context) => {
    if (repeatPassword !== password) {
      context.addIssue({
        code: 'custom',
        message: "Passwords doesn't match."
      });
    }
  });

export default function SignUp() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: User) => {
      try {
        const user = UserSchema.parse(data);
        const { token, uid } = await Api.user.signUp(user);
        localStorage.setItem('AUTH', token);
        setAuth({ isAuthenticated: true, uid: uid });
        navigate('/');
      } catch (error: any) {
        errorHandler(error);
      }
    },
    [navigate, setAuth]
  );

  return (
    <PageLayout title="Sign Up" excludeNavbar excludeHeader>
      <Form header="Sign Up" schema={schema} onSubmit={onSubmit} />
    </PageLayout>
  );
}
