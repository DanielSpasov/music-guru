import styled from 'styled-components';
import { ReactNode } from 'react';

import { essentials, shadows, colors, flex, text } from '../../helpers';

type BoxProps = {
  children?: ReactNode;
  [css: string]: any;
};

export default function Box({ children, ...css }: BoxProps) {
  return <StyledBox {...css}>{children}</StyledBox>;
}

const StyledBox = styled('div')<BoxProps>`
  ${essentials};
  ${shadows};
  ${colors};
  ${flex};
  ${text};
`;
