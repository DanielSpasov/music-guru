import styled from 'styled-components';

import { IconProps } from './helpers';

export const SVG = styled('svg')<IconProps>`
  xmlns: 'http://www.w3.org/2000/svg';
  width: 34px;
  height: 34px;

  color: ${({ disabled, variant, theme: { colors } }) => {
    if (disabled) return 'gray';
    return colors[variant || 'text'];
  }};

  cursor: ${({ disabled, onClick }) => {
    if (disabled) return 'auto';
    return onClick ? 'pointer' : 'auto';
  }};

  path {
    transition: 0.3s;
  }

  &:hover {
    color: ${({ disabled, onClick, variant, theme: { colors } }) => {
      if (disabled) return 'gray';
      return onClick ? colors.primary : colors[variant || 'text'];
    }};
  }
`;
