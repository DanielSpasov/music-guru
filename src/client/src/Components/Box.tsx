import { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../Contexts/Theme';

export default function Box({ children, ...rest }: any) {
  const theme = useContext(ThemeContext);
  return (
    <StyledBox {...rest} theme={theme}>
      {children}
    </StyledBox>
  );
}

const StyledBox = styled('div')<any>`
  position: ${({ position }) => position || 'static'};
  display: ${({ display }) => display || 'block'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
  flex-wrap: ${({ flexWrap }) => flexWrap || 'wrap'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-content: ${({ alignContent }) => alignContent || 'flex-start'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  background-color: ${({ backgroundColor, theme: { base } }) =>
    backgroundColor || base};
`;
