import styled from 'styled-components';

import { colors, essentials, font } from '../../../helpers';

export const StyledInput = styled('input')<any>`
  border: 2px solid ${({ theme: { colors } }) => colors.baseLighter};
  background-color: ${({ theme: { colors } }) => colors.baseLight};
  color: ${({ theme: { colors } }) => colors.text};
  box-sizing: border-box;
  transition: 0.3s;
  margin: 0.5em 0;
  padding: 0.5em 4.5em 0.5em 0.5em;
  font-size: 1em;
  outline: none;
  width: 100%;

  caret-color: ${({ disableCaret }) => (disableCaret ? 'transparent' : 'auto')};
  cursor: ${({ disableCaret }) => (disableCaret ? 'pointer' : 'auto')};

  ${essentials}
  ${colors}
  ${font}

  &:hover {
    border: 2px solid ${({ theme: { colors } }) => colors.baseLightest};
  }

  &:focus {
    border: 2px solid ${({ theme: { colors } }) => colors.primary};
  }

  &:focus ~ label,
  &:not(:placeholder-shown)&:not(:focus) ~ label {
    top: -1.5em;
    left: 0em;
  }

  &[type='file']:hover {
    cursor: pointer;
    border: 2px dashed ${({ theme: { colors } }) => colors.baseLightest};
  }

  &[type='file']::file-selector-button {
    display: none;
  }
`;
