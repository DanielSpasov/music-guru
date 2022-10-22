import { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { ThemeContext } from '../../Contexts/Theme';

type LinkProps = {
  children: JSX.Element | JSX.Element[] | string;
  to: string;
  className?: string;
  theme?: typeof ThemeContext;
};

const RouterNavLink = ({ children, className, to = '/' }: LinkProps) => (
  <NavLink to={to} className={className}>
    {children}
  </NavLink>
);

const StyledLink = styled(RouterNavLink)`
  text-decoration: none;
  color: ${({ theme: { primary } }) => primary};
  font-size: 1.25em;
  padding: 0.25em;
  transition: 0.2s;

  &:hover {
    color: white;
  }
`;

const Link = ({ children, className, to = '/' }: LinkProps) => {
  const theme = useContext(ThemeContext);
  return (
    <StyledLink to={to} theme={theme} className={className}>
      {children}
    </StyledLink>
  );
};

export default Link;
