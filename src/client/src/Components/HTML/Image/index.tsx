import styled from 'styled-components';

type ImageProps = {
  src: string;
  alt?: string;
  [css: string]: any;
};

export default function Image({ src, alt, ...css }: ImageProps) {
  return <StyledImage src={src} alt={alt} {...css} />;
}

const StyledImage = styled('img')<ImageProps>`
  ${css => ({ ...css })}
`;
