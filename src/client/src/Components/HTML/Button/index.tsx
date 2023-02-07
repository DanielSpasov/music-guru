import styled from 'styled-components';

import { border, colors, font } from '../../helpers';
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
  ${colors};
  ${border};
  ${font};

  background-color: ${({ variant, theme: { colors } }) => colors[variant!]};
  border: 2px solid transparent;
  padding: 0.75em 1.25em;
  font-weight: bold;
  margin: 0.75em 0;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    opacity: 70%;
  }

  &:disabled {
    cursor: auto;
    opacity: 50%;
  }
`;
