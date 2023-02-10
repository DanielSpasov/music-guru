import { useEffect, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { Box, BreadCrumb, Header, Loader, Navbar } from '../../';
import { PageLayoutProps } from './helpers';

export default function PageLayout({
  title,
  showNavbar = true,
  showBreadCrumb = true,
  showHeader = true,
  children,
  actions = [],
  loading = false
}: PageLayoutProps) {
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    document.title = loading ? 'Loading...' : title;
  }, [title, loading]);

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
      {loading ? (
        <Box textAlign="center" margin="1em 0">
          <Loader rainbow />
        </Box>
      ) : (
        showHeader && <Header padding="60px 0 20px 0" title={title} />
      )}
      {!loading && children}
    </Box>
  );
}
