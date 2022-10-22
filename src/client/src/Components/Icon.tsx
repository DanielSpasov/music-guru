import styled from 'styled-components';
import { useContext } from 'react';

import { ThemeContext } from '../Contexts/Theme';

export default function Icon({ model, type, ...props }: any) {
  const theme = useContext(ThemeContext);
  return (
    <StyledIcon {...props} theme={theme}>
      <i className={`fa-${type} fa-${model}`}></i>
    </StyledIcon>
  );
}

const StyledIcon = styled('i')<any>`
  color: ${({ color }) => color || 'white'};
  font-size: ${({ fontSize }) => fontSize || '30px'};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
  transition: 0.2s;

  &:hover {
    color: ${({ onClick, theme: { primary } }) =>
      onClick ? primary : 'white'};
  }
  ${props => ({ ...props })};
`;
