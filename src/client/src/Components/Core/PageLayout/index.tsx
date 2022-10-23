import { ReactNode, useContext, useEffect } from 'react';

import { ThemeContext } from '../../../Contexts/Theme';
import { Box, Header, Navbar } from '../../';

type PageLayoutProps = {
  title: string;
  excludeNavbar?: boolean;
  excludeHeader?: boolean;
  children?: ReactNode;
};

export default function PageLayout({
  title,
  excludeNavbar = false,
  excludeHeader = false,
  children
}: PageLayoutProps) {
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
        <Header padding="60px 0 20px 0" title={title}></Header>
      )}
      {children}
    </Box>
  );
}
