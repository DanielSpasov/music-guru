import { useEffect } from 'react';
import { Box } from '../Components';

export default function SinglePageLayout({
  title,
  children
}: {
  title: string;
  children?: JSX.Element | JSX.Element[];
}) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <Box>{children}</Box>;
}
