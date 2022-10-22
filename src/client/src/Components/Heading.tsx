import styled from 'styled-components';

export default function Heading({ children, props }: any) {
  return <StyledHeading {...props}>{children}</StyledHeading>;
}

const StyledHeading = styled.h1`
  text-align: center;
  color: white;
`;
