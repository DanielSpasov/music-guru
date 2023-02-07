import { useEffect, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { Box, BreadCrumb, Header, Navbar } from '../../';
import { PageLayoutProps } from './helpers';

export default function PageLayout({
  title,
  showNavbar = true,
  showBreadCrumb = true,
  showHeader = true,
  children,
  actions = []
}: PageLayoutProps) {
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Box
      minHeight="100vh"
      height="100%"
      backgroundColor={colors.baseLight}
      display="flex"
      flexDirection="column"
      alignContent="center"
    >
      {showNavbar && <Navbar />}
      {showBreadCrumb && <BreadCrumb actions={actions} />}
      {showHeader && <Header padding="60px 0 20px 0" title={title}></Header>}
      {children}
    </Box>
  );
}
