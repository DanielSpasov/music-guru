import { Button, Form, Input, PageLayout } from '../../../Components';

export default function SignUp() {
  const onSubmit = () => {
    console.log('In Sign Up');
  };

  return (
    <PageLayout title="Sign Up" excludeNavbar excludeHeader>
      <Form title="Sign Up" onSubmit={onSubmit}>
        <Input label="Username" />
        <Input label="Email" />
        <Input label="Password" />
        <Input label="Repeat Password" />
        <Button variant="primary" type="submit" label="Sign Up"></Button>
      </Form>
    </PageLayout>
  );
}
