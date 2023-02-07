import styled from 'styled-components';

import { colors, font } from '../../helpers';
import { TextProps } from './helpers';

export default function Text({ children, ...css }: TextProps) {
  return <StyledText {...css}>{children}</StyledText>;
}

const StyledText = styled('span')<TextProps>`
  fontsize: inherit;

  ${colors};
  ${font};
`;
