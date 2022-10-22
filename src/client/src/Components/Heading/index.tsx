import styled from 'styled-components';

export default function Heading({ children, title, ...props }: any) {
  return (
    <StyledHeading {...props}>
      <StyledHeader>{title}</StyledHeader>
      {children}
    </StyledHeading>
  );
}

const StyledHeader = styled.h1`
  text-align: center;
  color: white;
  margin: 10px;
`;

const StyledHeading = styled('header')<any>`
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  ${props => ({ ...props })};
`;
