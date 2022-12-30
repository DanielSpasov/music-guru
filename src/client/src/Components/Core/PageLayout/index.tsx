import { ReactNode, useContext, useEffect } from 'react';

import { ThemeContext } from '../../../Contexts/Theme';
import { Box, BreadCrumb, Header, Navbar } from '../../';

type PageLayoutProps = {
  title: string;
  showNavbar?: boolean;
  showBreadCrumb?: boolean;
  showHeader?: boolean;
  children?: ReactNode;
};

export default function PageLayout({
  title,
  showNavbar = true,
  showBreadCrumb = true,
  showHeader = true,
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
      {showNavbar && <Navbar />}
      {showBreadCrumb && <BreadCrumb />}
      {showHeader && <Header padding="60px 0 20px 0" title={title}></Header>}
      {children}
    </Box>
  );
}
