import { NavLink } from 'react-router-dom';

import styles from './styles.module.css';

export default function Link({
  children,
  to = '/',
  variant = 'default'
}: {
  children?: JSX.Element | JSX.Element[] | string;
  to: string;
  variant?: string;
}) {
  return (
    <NavLink to={to} className={styles[variant]}>
      {children}
    </NavLink>
  );
}
