import styled from 'styled-components';

export default function Image(props: any) {
  return <StyledImage {...props} />;
}

const StyledImage = styled.img`
  src: ${({ src }) => src || 'default image url'};
  alt: ${({ alt }) => alt || 'Image'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
`;
