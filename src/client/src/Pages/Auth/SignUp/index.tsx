import { Button, Form, Input, PageLayout } from '../../../Components';

export default function SignUp() {
  const onSubmit = () => {
    console.log('Signing Up...');
  };

  return (
    <PageLayout title="Sign Up" excludeNavbar excludeHeader>
      <Form title="Sign Up" onSubmit={onSubmit}>
        <Input
          control="username"
          type="text"
          label="Username"
          dynamicLabel
          maxLength="16"
        />
        <Input
          control="email"
          type="email"
          label="Email"
          dynamicLabel
          required
        />
        <Input
          control="password"
          type="password"
          label="Password"
          dynamicLabel
          required
        />
        <Input
          control="repeatPassword"
          type="password"
          label="Repeat Password"
          dynamicLabel
          required
        />

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </PageLayout>
  );
}
