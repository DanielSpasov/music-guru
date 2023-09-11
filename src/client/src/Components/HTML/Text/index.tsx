import styled from 'styled-components';

import { colors, font, padding, text } from '../../helpers';
import { TextProps } from './helpers';

export default function Text({ children, ...css }: TextProps) {
  return <StyledText {...css}>{children}</StyledText>;
}

const StyledText = styled('span')<TextProps>`
  font-size: inherit;
  transition: 0.3s;
  color: ${({ variant, theme: { colors }, color }) => {
    if (variant) return colors[variant];
    return color || colors.text;
  }};

  ${padding};
  ${colors};
  ${font};
  ${text};

  &:hover {
    cursor: ${({ onClick }) => onClick && 'pointer'};
    color: ${({ onClick, theme: { colors } }) => onClick && colors.primary};
  }
`;
