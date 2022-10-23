import styled from 'styled-components';
import { ReactNode, useContext } from 'react';

import { ThemeContext } from '../../../Contexts/Theme';

type BoxProps = {
  children?: ReactNode;
  [css: string]: any;
};

export default function Box({ children, ...css }: BoxProps) {
  const theme = useContext(ThemeContext);
  return (
    <StyledBox {...css} theme={theme}>
      {children}
    </StyledBox>
  );
}

const StyledBox = styled('div')<BoxProps>`
  flex-wrap: wrap;
  color: white;
  background-color: ${({ backgroundColor, theme: { base } }) =>
    backgroundColor || base};

  ${css => ({ ...css })}
`;
