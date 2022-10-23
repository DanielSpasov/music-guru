import { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../Contexts/Theme';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

type ButtonType = 'button' | 'submit' | 'reset';

export default function Button({
  label,
  variant,
  type = 'button',
  ...props
}: {
  label: string;
  type?: ButtonType;
  variant?: ButtonVariant;
}) {
  const theme = useContext(ThemeContext);
  return (
    <StyledButton variant={variant} type={type} theme={theme} {...props}>
      {label}
    </StyledButton>
  );
}

const StyledButton = styled('button')<any>`
  font-family: 'Maven Pro', sans-serif;
  background-color: ${({ variant, theme }) => theme[variant] || theme.base};
  border: 2px solid transparent;
  padding: 0.75em 1.25em;
  border-radius: 10px;
  margin: 0.75em 0;
  transition: 0.2s;
  font-size: 1em;
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 75%;
  }
`;
