import styled from 'styled-components';
import { ReactNode } from 'react';

import { colors, font } from '../../helpers';

type TextProps = {
  children: ReactNode;
  [css: string]: any;
};

export default function Text({ children, ...css }: TextProps) {
  return <StyledText {...css}>{children}</StyledText>;
}

const StyledText = styled('span')<TextProps>`
  fontsize: inherit;

  ${colors};
  ${font};
`;
