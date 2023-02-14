import styled from 'styled-components';

import { border, dimensions, onHover, positioning } from '../../helpers';
import { ImageProps } from './helpers';

export default function Image({ src, alt, ...css }: ImageProps) {
  return <StyledImage src={src} alt={alt} {...css} />;
}

const StyledImage = styled('img')<ImageProps>`
  ${positioning};
  ${dimensions};
  ${onHover};
  ${border};

  transition: 0.3s;

  &:hover {
    cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
  }
`;
