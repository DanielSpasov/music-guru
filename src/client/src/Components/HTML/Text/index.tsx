import styled from 'styled-components';

import { colors, font, padding } from '../../helpers';
import { TextProps } from './helpers';

export default function Text({ children, ...css }: TextProps) {
  return <StyledText {...css}>{children}</StyledText>;
}

const StyledText = styled('span')<TextProps>`
  fontsize: inherit;
  transition: 0.3s;

  ${padding};
  ${colors};
  ${font};

  &:hover {
    cursor: ${({ onClick }) => onClick && 'pointer'};
    color: ${({ onClick, theme: { colors } }) => onClick && colors.primary};
  }
`;
