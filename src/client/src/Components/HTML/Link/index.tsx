import { NavLink, Link as RouterLink } from 'react-router-dom';
import { useContext, ReactNode } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../../../Contexts/Theme';

type LinkProps = {
  to: string;
  children: ReactNode;
  type?: 'navlink' | 'link';
  isActive?: boolean;
  className?: string;
  [css: string]: any;
};

function LinkSwitch({
  children,
  className,
  to = '/',
  type = 'link',
  isActive = false
}: LinkProps) {
  const { primary } = useContext(ThemeContext);

  return type === 'navlink' ? (
    <NavLink
      className={className}
      to={to}
      style={
        isActive
          ? {
              borderBottom: `5px solid ${primary}`,
              color: primary
            }
          : {}
      }
    >
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

  ${css => ({ ...css })}
`;

export default function Link(props: LinkProps) {
  const theme = useContext(ThemeContext);
  return <StyledLink theme={theme} {...props} />;
}
