import { NavLink, Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import {
  colors,
  dimensions,
  font,
  padding,
  positioning,
  text
} from '../../helpers';
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

  color: ${({ isActive, theme: { colors } }) =>
    isActive ? colors.primary : colors.text};
  padding: ${({ type }) => (type === 'navlink' ? '18px 0.25em' : '0.25em')};
  transition: 0.3s;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  ${positioning};
  ${dimensions};
  ${padding};
  ${colors};
  ${font};
  ${text};

  &:hover {
    color: ${({ theme: { colors } }) => colors.primary};
  }
`;

export default function Link(props: LinkProps) {
  return <StyledLink fontSize="1.25em" {...props} />;
}
