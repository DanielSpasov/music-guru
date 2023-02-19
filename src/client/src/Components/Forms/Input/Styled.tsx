import styled from 'styled-components';
import { colors, essentials, font } from '../../helpers';

export const StyledInput = styled('input')<any>`
  border: 2px solid ${({ theme: { colors } }) => colors.baseLighter};
  background-color: ${({ theme: { colors } }) => colors.baseLight};
  color: ${({ theme: { colors } }) => colors.text};
  box-sizing: border-box;
  transition: 0.3s;
  margin: 0.5em 0;
  padding: 0.5em;
  font-size: 1em;
  outline: none;
  width: 100%;

  ${essentials}
  ${colors}
  ${font}

  &:hover {
    border: 2px solid ${({ theme: { colors } }) => colors.baseLightest};
  }

  &:focus {
    border: 2px solid ${({ theme: { colors } }) => colors.primary};
  }

  & ~ label {
    transition: 0.3s;
  }

  &:focus ~ label,
  &:not(:placeholder-shown)&:not(:focus) ~ label {
    top: 0;
    left: 0;
  }
`;
