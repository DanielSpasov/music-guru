import { ReactNode } from 'react';
import styled from 'styled-components';

import { Heading } from '../../';

type HeaderProps = {
  title: string;
  children?: ReactNode;
  [css: string]: any;
};

export default function Header({ children, title, ...css }: HeaderProps) {
  return (
    <StyledHeader {...css}>
      <Heading title={title} />
      {children}
    </StyledHeader>
  );
}

const StyledHeader = styled('header')<HeaderProps>`
  flex-direction: column;
  text-align: center;
  display: flex;
  color: white;

  ${css => ({ ...css })};
`;
