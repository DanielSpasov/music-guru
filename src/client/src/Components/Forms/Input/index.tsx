import { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../../Contexts/Theme';

import { Text, Box } from '../../';

export default function Input({ label, placeholder, ...props }: any) {
  const theme = useContext(ThemeContext);

  return (
    <Box>
      {label && <Text>{label}</Text>}
      <StyledInput placeholder={placeholder} theme={theme} {...props} />
    </Box>
  );
}

const StyledInput = styled('input')<any>`
  background-color: ${({ theme }) => theme.baseLight};
  border: 2px solid ${({ theme }) => theme.baseLighter};
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5em;
  margin: 0.75em 0;
  outline: none;
  font-size: 1em;
  color: white;
  width: 100%;
  ${({ props }) => ({ ...props })}

  &:hover {
    border: 2px solid ${({ theme }) => theme.baseLightest};
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.primary};
  }
`;
