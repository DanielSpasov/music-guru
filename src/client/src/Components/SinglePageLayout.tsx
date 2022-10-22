import { useContext, useEffect } from 'react';
import { Box } from '../Components';
import { ThemeContext } from '../Contexts/Theme';
import Heading from './Heading';

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
