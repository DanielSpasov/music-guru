import styled from 'styled-components';
import { useContext } from 'react';

import { ThemeContext } from '../../../Contexts/Theme';

type IconProps = {
  model: string;
  type: string;
  [css: string]: any;
};

export default function Icon({ model, type, ...css }: IconProps) {
  const theme = useContext(ThemeContext);
  return (
    <StyledIcon {...css} theme={theme}>
      <i className={`fa-${type} fa-${model}`} />
    </StyledIcon>
  );
}

const StyledIcon = styled('i')<IconProps>`
  color: white;
  font-size: 30px;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
  transition: 0.2s;

  &:hover {
    color: ${({ onClick, theme: { primary } }) =>
      onClick ? primary : 'white'};
  }

  ${css => ({ ...css })};
`;
