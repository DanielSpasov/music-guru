import { useContext, useEffect } from 'react';

import { ThemeContext } from '../../Contexts/Theme';
import { Box, Heading, Navbar } from '../';

export default function SinglePageLayout({
  title,
  excludeNavbar = false,
  excludeHeader = false,
  children
}: {
  title: string;
  excludeNavbar?: boolean;
  excludeHeader?: boolean;
  children?: JSX.Element | JSX.Element[] | string;
}) {
  const { baseLight } = useContext(ThemeContext);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Box
      minHeight="100vh"
      height="100%"
      backgroundColor={baseLight}
      display="flex"
      flexDirection="column"
      alignContent="center"
    >
      {!excludeNavbar && <Navbar />}
      {!excludeHeader && (
        <Heading padding="60px 0 20px 0" title={title}></Heading>
      )}
      {children}
    </Box>
  );
}
