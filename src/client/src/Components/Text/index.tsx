import styled from 'styled-components';

export default function Text({ children, ...props }: { children: any }) {
  return <StyledText {...props}>{children}</StyledText>;
}

const StyledText = styled('span')<any>`
  color: white;
  font-size: 1em;
  ${({ props }) => ({ ...props })};
`;
