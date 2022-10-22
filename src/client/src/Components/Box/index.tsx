import { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../../Contexts/Theme';

export default function Box({ children, ...rest }: any) {
  const theme = useContext(ThemeContext);
  return (
    <StyledBox {...rest} theme={theme}>
      {children}
    </StyledBox>
  );
}

const StyledBox = styled('div')<any>`
  flex-wrap: ${({ flexWrap }) => flexWrap || 'wrap'};
  color: ${({ color }) => color || 'white'};
  background-color: ${({ backgroundColor, theme: { base } }) =>
    backgroundColor || base};
  ${props => ({ ...props })}
`;
