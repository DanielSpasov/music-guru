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
  font-size: 30px;

  ${positioning};
  ${dimensions};
  ${padding};
  ${colors};
  ${font};

  color: ${({ variant, theme: { colors } }) =>
    variant ? colors[variant] : colors.text};

  &:hover {
    cursor: pointer;
    color: ${({ onClick, theme: { colors }, color }) =>
      onClick ? colors.primary : color || colors.text};
  }
`;
