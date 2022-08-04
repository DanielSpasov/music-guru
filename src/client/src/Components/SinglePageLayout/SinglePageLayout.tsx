import { ReactNode, useEffect } from 'react';
import styles from './SinglePageLayout.module.css';

function SinglePageLayout({
  title,
  children
}: {
  title: string;
  children?: ReactNode;
}) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <main className={styles.main}>{children}</main>;
}

export default SinglePageLayout;
