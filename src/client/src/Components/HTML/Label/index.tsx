import styled from 'styled-components';

import { essentials, font } from '../../helpers';
import { LabelProps } from './helpers';

export default function Label({ children, ...css }: LabelProps) {
  return <StyledLabel {...css}>{children}</StyledLabel>;
}

const StyledLabel = styled('label')<LabelProps>`
  color: ${({ theme: { colors } }) => colors.text};
  text-overflow: ellipsis;
  pointer-events: none;
  overflow: hidden;
  inline-size: 96%;

  ${essentials};
  ${font};
`;
