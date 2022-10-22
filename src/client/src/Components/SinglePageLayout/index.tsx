import { useContext, useEffect } from 'react';

import { ThemeContext } from '../../Contexts/Theme';
import { Box, Heading } from '../';

export default function SinglePageLayout({
  title,
  children
}: {
  title: string;
  children?: JSX.Element | JSX.Element[];
}) {
  const { baseLight } = useContext(ThemeContext);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Box
      minHeight="calc(100vh - 60px)"
      height="100%"
      paddingTop="60px"
      backgroundColor={baseLight}
    >
      <Heading>{title}</Heading>
      {children}
    </Box>
  );
}
