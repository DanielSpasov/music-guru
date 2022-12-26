import * as z from 'zod';

import { Form, PageLayout } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import { User } from '../../../Types/User';
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
  const onSubmit = async (data: User) => {
    try {
      const user = UserSchema.parse(data);
      const res = await Api.user.post({ body: user });
      console.log(res);
    } catch (error: any) {
      errorHandler(error);
    }
  };

  return (
    <PageLayout title="Sign Up" excludeNavbar excludeHeader>
      <Form header="Sign Up" schema={schema} onSubmit={onSubmit} />
    </PageLayout>
  );
}
