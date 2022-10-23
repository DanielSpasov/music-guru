import styled from 'styled-components';
import { ReactNode } from 'react';

type LabelProps = {
  children?: ReactNode;
  [css: string]: any;
};

export default function Label({ children, ...css }: LabelProps) {
  return <StyledLabel {...css}>{children}</StyledLabel>;
}

const StyledLabel = styled('label')<LabelProps>`
  font-size: 1em;

  ${css => ({ ...css })}
`;
