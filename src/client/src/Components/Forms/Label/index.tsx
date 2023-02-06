import styled from 'styled-components';
import { ReactNode } from 'react';

import { essentials, font } from '../../helpers';

type LabelProps = {
  children?: ReactNode;
  [css: string]: any;
};

export default function Label({ children, ...css }: LabelProps) {
  return <StyledLabel {...css}>{children}</StyledLabel>;
}

const StyledLabel = styled('label')<LabelProps>`
  pointer-events: none;

  ${essentials};
  ${font};

  text-overflow: ellipsis;
  overflow: hidden;
  inline-size: 96%;
`;
