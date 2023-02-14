import styled from 'styled-components';

import {
  essentials,
  shadows,
  colors,
  flex,
  text,
  pointer,
  animations
} from '../../helpers';
import { BoxProps } from './helpers';

export default function Box({ children, ...css }: BoxProps) {
  return <StyledBox {...css}>{children}</StyledBox>;
}

const StyledBox = styled('div')<BoxProps>`
  box-sizing: border-box;

  ${animations};
  ${essentials};
  ${pointer};
  ${shadows};
  ${colors};
  ${flex};
  ${text};

  &:hover {
    cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
    ${({ hoverCSS }) => hoverCSS};
  }
`;
