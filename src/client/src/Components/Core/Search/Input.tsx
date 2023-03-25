import styled from 'styled-components';

import { colors, essentials, font } from '../../helpers';
import { InputProps } from './helpers';

export default function Input({
  placeholder,
  onChange,
  open,
  value,
  type = 'text',
  width,
  ...css
}: InputProps) {
  return (
    <StyledInput
      onChange={onChange}
      disabled={!open}
      placeholder={open ? placeholder : ''}
      width={open ? width : '40px'}
      opacity={open ? '1' : '0'}
      type={type}
      value={!open ? '' : value}
      {...css}
    />
  );
}

const StyledInput = styled('input')<InputProps>`
  border: 2px solid ${({ theme: { colors } }) => colors.baseLighter};
  background-color: ${({ theme: { colors } }) => colors.baseLight};
  color: ${({ theme: { colors } }) => colors.text};
  box-sizing: border-box;
  transition: 0.3s;
  font-size: 1em;
  padding: 0.5em;
  outline: none;

  ${essentials}
  ${colors}
  ${font}


  &:hover {
    border: 2px solid
      ${({ open, theme: { colors } }) =>
        open ? colors.baseLightest : colors.baseLighter};
  }

  &:focus {
    border: 2px solid ${({ theme: { colors } }) => colors.primary};
  }
`;
