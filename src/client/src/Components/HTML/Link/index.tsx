import { NavLink, Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import { colors, font, padding, text } from '../../helpers';
import { LinkProps } from './helpers';

function LinkSwitch({
  children,
  className,
  to = '/',
  type = 'link'
}: LinkProps) {
  return type === 'navlink' ? (
    <NavLink className={className} to={to}>
      {children}
    </NavLink>
  ) : (
    <RouterLink className={className} to={to}>
      {children}
    </RouterLink>
  );
}

const StyledLink = styled(LinkSwitch)<LinkProps>`
  box-sizing: border-box;

  ${padding};
  ${colors};
  ${font};
  ${text};

  border-bottom: ${({ isActive, theme: { colors } }) =>
    isActive && `5px solid ${colors.primary}`};
  color: ${({ isActive, theme: { colors } }) => isActive && colors.primary};
  padding: ${({ type }) => (type === 'navlink' ? '18px 0.25em' : '0.25em')};
  transition: 0.2s;
  height: 100%;

  &:hover {
    color: ${({ theme: { colors } }) => colors.primary};
  }
`;

export default function Link(props: LinkProps) {
  return <StyledLink fontSize="1.25em" {...props} />;
}
