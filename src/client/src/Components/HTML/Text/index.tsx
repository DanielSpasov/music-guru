import styled from 'styled-components';
import { ReactNode } from 'react';

type TextProps = {
  children: ReactNode;
  color?: string;
};

export default function Text({ children, color = 'white' }: TextProps) {
  return <StyledText color={color}>{children}</StyledText>;
}

const StyledText = styled('span')<TextProps>`
  font-size: 1em;
  color: ${({ color }) => color};
`;
