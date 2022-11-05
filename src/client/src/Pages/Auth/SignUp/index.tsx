import { Button, Form, Input, PageLayout } from '../../../Components';
import { validateUsername } from './helpers';

type FormData = {
  username?: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export default function SignUp() {
  const onSubmit = (formData: FormData) => {
    try {
      console.log({ formData });
      console.log('Signing Up...');
    } catch (error: any) {
      // TODO: Notification service
      console.error(error);
    }
  };

  return (
    <PageLayout title="Sign Up" excludeNavbar excludeHeader>
      <Form title="Sign Up" onSubmit={onSubmit}>
        <Input type="text" label="Username" validateFn={validateUsername} />
        <Input type="email" label="Email" required />
        <Input type="password" label="Password" required />
        <Input type="password" label="Repeat Password" required />

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </PageLayout>
  );
}
