import { Form, PageLayout } from '../../../Components';
import schema from './schema';

type FormData = {
  username?: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export default function SignUp() {
  const onSubmit = (formData: FormData) => {
    try {
      console.log('Signing Up...', { formData });
    } catch (error: any) {
      // TODO: Notification service
      console.error(error);
    }
  };

  return (
    <PageLayout title="Sign Up" excludeNavbar excludeHeader>
      <Form
        title="Sign Up"
        schema={schema}
        submitFn={onSubmit}
        defaultValues={{}}
      />
    </PageLayout>
  );
}
