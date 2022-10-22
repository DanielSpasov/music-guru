import styled from 'styled-components';

export default function Heading({ children, props }: any) {
  return <StyledHeading {...props}>{children}</StyledHeading>;
}

const StyledHeading = styled.header`
  text-align: center;
  color: white;
`;
