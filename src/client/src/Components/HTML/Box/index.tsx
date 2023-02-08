import styled from 'styled-components';

import {
  essentials,
  shadows,
  colors,
  flex,
  text,
  pointer
} from '../../helpers';
import { BoxProps } from './helpers';

export default function Box({ children, ...css }: BoxProps) {
  return <StyledBox {...css}>{children}</StyledBox>;
}

const StyledBox = styled('div')<BoxProps>`
  ${essentials};
  ${pointer};
  ${shadows};
  ${colors};
  ${flex};
  ${text};
`;
