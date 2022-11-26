import { Form, PageLayout } from '../../../Components';
import Api from '../../../Api';
import schema from './schema';

export default function SignUp() {
  const onSubmit = async (data: {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
  }) => {
    try {
      const res = await Api.auth.signUp(data);
      console.log(res);
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
