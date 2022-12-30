import styled from 'styled-components';
import { ReactNode, useContext } from 'react';

import { ThemeContext } from '../../../Contexts/Theme';

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
  const theme = useContext(ThemeContext);
  return (
    <StyledButton variant={variant} type={type} theme={theme} {...css}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled('button')<ButtonProps>`
  font-family: 'Maven Pro', sans-serif;
  background-color: ${({ variant, theme }) =>
    variant ? theme[variant] : theme.base};
  border: 2px solid transparent;
  padding: 0.75em 1.25em;
  border-radius: 6px;
  font-weight: bold;
  margin: 0.75em 0;
  transition: 0.2s;
  font-size: 1em;
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 85%;
  }

  &:disabled {
    cursor: auto;
    opacity: 50%;
  }

  ${css => ({ ...css })};
`;
