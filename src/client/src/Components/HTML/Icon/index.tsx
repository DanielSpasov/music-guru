import styled from 'styled-components';

import { colors, dimensions, font, padding, positioning } from '../../helpers';
import { IconProps } from './helpers';

export default function Icon({ model, type, variant, ...css }: IconProps) {
  return (
    <StyledIcon variant={variant} {...css}>
      <i className={`fa-${type} fa-${model}`} />
    </StyledIcon>
  );
}

const StyledIcon = styled('i')<IconProps>`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
  transition: 0.3s;
  font-size: 1.5em;

  ${positioning};
  ${dimensions};
  ${padding};
  ${colors};
  ${font};

  color: ${({ variant, theme: { colors }, color, disabled }) => {
    if (disabled) return 'gray';
    return variant ? colors[variant] : color || colors.text;
  }};

  &:hover {
    cursor: ${({ disabled, onClick }) => {
      if (disabled) return 'auto';
      return onClick ? 'pointer' : 'auto';
    }};
    color: ${({ onClick, theme: { colors }, color, disabled }) => {
      if (disabled) return 'gray';
      return onClick ? colors.primary : color || colors.text;
    }};
  }
`;
