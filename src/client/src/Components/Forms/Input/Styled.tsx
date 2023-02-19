import styled from 'styled-components';
import { colors, essentials, font } from '../../helpers';

export const StyledInput = styled('input')<any>`
  box-sizing: border-box;
  transition: 0.3s;

  ${essentials}
  ${colors}
  ${font}

  background-color: ${({ theme: { colors } }) => colors.baseLight};
  border: 2px solid ${({ theme: { colors } }) => colors.baseLighter};
  margin: 0.5em 0;
  padding: 0.5em;
  outline: none;
  width: 100%;

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
