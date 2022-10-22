import { useContext } from 'react';

import { Box, Heading, Input, SinglePageLayout } from '../../../Components';
import { ThemeContext } from '../../../Contexts/Theme';

export default function SignUp() {
  const { base } = useContext(ThemeContext);

  return (
    <SinglePageLayout title="Sign Up" excludeNavbar excludeHeader>
      <Box
        backgroundColor={base}
        borderRadius="10px"
        minWidth="400px"
        padding=".75em"
        margin="auto"
        width="35%"
        top="50%"
        boxShadow="rgba(0, 0, 0, 0.65) 0px 0px 15px"
      >
        <Heading title="Sign Up" />
        <Input label="Username" />
        <Input label="Email" />
        <Input label="Password" />
        <Input label="Repeat Password" />
      </Box>
    </SinglePageLayout>
  );
}
