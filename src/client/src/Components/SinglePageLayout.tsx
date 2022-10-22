import { useContext, useEffect } from 'react';
import { Box } from '../Components';
import { ThemeContext } from '../Contexts/Theme';

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
    <Box height="100vh" backgroundColor={baseLight}>
      {children}
    </Box>
  );
}
