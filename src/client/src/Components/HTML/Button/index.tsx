import styled from 'styled-components';

import { border, colors, font, margin, padding } from '../../helpers';
import { ButtonProps } from './helpers';

export default function Button({
  variant,
  type = 'button',
  children,
  ...css
}: ButtonProps) {
  return (
    <StyledButton variant={variant} type={type} {...css}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled('button')<ButtonProps>`
  background-color: ${({ variant, theme: { colors } }) =>
    variant ? colors[variant] : colors.primary};
  color: ${({ theme: { colors }, color }) => color || colors.text};
  border: 2px solid transparent;
  padding: 0.75em 1.25em;
  font-weight: bold;
  margin: 0.75em 0;
  transition: 0.3s;
  font-size: 1em;

  ${padding};
  ${colors};
  ${margin};
  ${border};
  ${font};

  &:hover {
    cursor: pointer;
    opacity: 70%;
  }

  &:disabled {
    cursor: auto;
    opacity: 50%;
  }
`;
