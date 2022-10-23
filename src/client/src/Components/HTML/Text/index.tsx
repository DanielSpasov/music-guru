import styled from 'styled-components';
import { ReactNode } from 'react';

type TextProps = {
  children: ReactNode;
  [css: string]: any;
};

export default function Text({ children, ...css }: TextProps) {
  return <StyledText {...css}>{children}</StyledText>;
}

const StyledText = styled('span')<TextProps>`
  color: white;
  font-size: 1em;

  ${css => ({ ...css })};
`;
