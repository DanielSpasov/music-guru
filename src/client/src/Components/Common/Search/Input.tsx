import styled from 'styled-components';
import { colors, essentials, font } from '../../helpers';
import { InputProps } from './helpers';

export default function Input({
  placeholder,
  onChange,
  open,
  value,
  type = 'text',
  ...css
}: InputProps) {
  return (
    <StyledInput
      onChange={onChange}
      disabled={!open}
      placeholder={open ? placeholder : ''}
      width={open ? '200px' : '40px'}
      opacity={open ? '1' : '0'}
      type={type}
      value={!open ? '' : value}
      {...css}
    />
  );
}

const StyledInput = styled('input')<InputProps>`
  box-sizing: border-box;
  transition: 0.3s;

  ${essentials}
  ${colors}
  ${font}

  background-color: ${({ theme: { colors } }) => colors.baseLight};
  border: 2px solid ${({ theme: { colors } }) => colors.baseLighter};
  padding: 0.5em;
  outline: none;

  &:hover {
    border: 2px solid
      ${({ open, theme: { colors } }) =>
        open ? colors.baseLightest : colors.baseLighter};
  }

  &:focus {
    border: 2px solid ${({ theme: { colors } }) => colors.primary};
  }
`;
