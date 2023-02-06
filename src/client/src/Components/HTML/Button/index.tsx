import styled from 'styled-components';
import { ReactNode } from 'react';

import { border, colors, font } from '../../helpers';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  children?: ReactNode;
  [css: string]: any;
};

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
