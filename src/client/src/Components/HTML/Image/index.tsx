import styled from 'styled-components';

import { border, dimensions, positioning } from '../../helpers';
import { ImageProps } from './helpers';

export default function Image({ src, alt, ...css }: ImageProps) {
  return <StyledImage src={src} alt={alt} {...css} />;
}

const StyledImage = styled('img')<ImageProps>`
  ${positioning};
  ${dimensions};
  ${border};

  transition: 0.3s;

  &:hover {
    cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
    ${({ hoverEffects }) => hoverEffects}
  }
`;
