import { useContext } from 'react';

import { Box, PageLayout } from '../../../Components';
import { ThemeContext } from '../../../Contexts/Theme';

export default function SignIn() {
  const { base } = useContext(ThemeContext);

  return (
    <PageLayout title="Sign In" excludeNavbar>
      <Box
        backgroundColor={base}
        borderRadius="10px"
        height="70vh"
        width="35%"
        minWidth="400px"
        boxShadow="rgba(0, 0, 0, 0.65) 0px 5px 15px"
        padding="0.5em"
      />
    </PageLayout>
  );
}
