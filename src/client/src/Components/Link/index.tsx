import { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { NavLink, Link as RouterLink } from 'react-router-dom';

import { ThemeContext } from '../../Contexts/Theme';

type LinkType = 'navlink' | 'link';
type LinkProps = {
  children: JSX.Element | JSX.Element[] | string;
  to: string;
  isActive?: boolean;
  className?: string;
  type?: LinkType;
};

function LinkSwitch({
  children,
  className,
  to = '/',
  type = 'link',
  isActive = false
}: LinkProps) {
  const { primary } = useContext(ThemeContext);

  const activeStyle = useMemo(
    () =>
      isActive
        ? {
            borderBottom: `5px solid ${primary}`,
            color: primary
          }
        : {},
    [isActive, primary]
  );

  return type === 'navlink' ? (
    <NavLink className={className} to={to} style={activeStyle}>
      {children}
    </NavLink>
  ) : (
    <RouterLink className={className} to={to}>
      {children}
    </RouterLink>
  );
}

const StyledLink = styled(LinkSwitch)<LinkProps>`
  color: white;
  box-sizing: border-box;
  text-decoration: none;
  font-size: 1.25em;
  transition: 0.2s;
  height: 100%;
  padding: ${({ type }) => (type === 'navlink' ? '18px 0.25em' : '0.25em')};

  &:hover {
    color: ${({ theme: { primary } }) => primary};
  }
`;

export default function Link(props: LinkProps) {
  const theme = useContext(ThemeContext);
  return <StyledLink theme={theme} {...props} />;
}
