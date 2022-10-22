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
  const { base } = useContext(ThemeContext);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return <Box backgroundColor={base}>{children}</Box>;
}
