import styled from 'styled-components';

import { dimensions } from '../../helpers';
import { ImageProps } from './helpers';

export default function Image({ src, alt, ...css }: ImageProps) {
  return <StyledImage src={src} alt={alt} {...css} />;
}

const StyledImage = styled('img')<ImageProps>`
  ${dimensions}
`;
