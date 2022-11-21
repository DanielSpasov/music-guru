import { Form, PageLayout } from '../../../Components';
import schema from './schema';

type FormData = {
  username?: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export default function SignUp() {
  const onSubmit = (data: FormData) => {
    try {
      console.log('Signing Up...', { data });
    } catch (error: any) {
      // TODO: Notification service
      console.error(error);
    }
  };

  return (
    <PageLayout title="Sign Up" excludeNavbar excludeHeader>
      <Form header="Sign Up" schema={schema} onSubmit={onSubmit} />
    </PageLayout>
  );
}
