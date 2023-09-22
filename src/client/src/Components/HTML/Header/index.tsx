import styled from 'styled-components';

import { HeaderProps } from './helpers';
import { Heading } from '../../';

export default function Header({ children, title, ...css }: HeaderProps) {
  return (
    <StyledHeader {...css}>
      <Heading title={title} margin="1em 0" />
      {children}
    </StyledHeader>
  );
}

const StyledHeader = styled('header')<HeaderProps>`
  display: flex;
  flex-direction: column;
  text-align: center;

  cursor: ${({ cursor }) => cursor || 'auto'};
  color: ${({ variant, theme: { colors } }) =>
    variant ? colors[variant] : colors.text};
`;
