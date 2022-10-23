import styled from 'styled-components';

export default function Image({
  src,
  alt,
  ...css
}: {
  src: string;
  alt?: string;
  [css: string]: any;
}) {
  return <StyledImage src={src} alt={alt} {...css} />;
}

const StyledImage = styled('img')<any>`
  ${props => ({ ...props })}
`;
