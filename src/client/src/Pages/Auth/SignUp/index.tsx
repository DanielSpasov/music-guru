import { Button, Form, Input, PageLayout } from '../../../Components';

export default function SignUp() {
  const onSubmit = () => {
    console.log('In Sign Up');
  };

  return (
    <PageLayout title="Sign Up" excludeNavbar excludeHeader>
      <Form title="Sign Up" onSubmit={onSubmit}>
        <Input type="text" label="Username" dynamicLabel />
        <Input type="email" label="Email" required />
        <Input type="password" placeholder="Password" required />
        <Input
          type="password"
          placeholder="Repeat Password"
          label="Repeat Password"
        />
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </PageLayout>
  );
}
