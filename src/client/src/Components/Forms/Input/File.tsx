import { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../../../Contexts/Theme';
import { FileInputProps } from './helpers';
import { Box, Icon } from '../../HTML';

export default function FileInput({
  register,
  required,
  name,
  value
}: FileInputProps) {
  const theme = useContext(ThemeContext);

  return (
    <Box display="flex" alignContent="center">
      <StyledLabel theme={theme}>
        {value?.[0]?.name || 'Upload Image'}
        <StyledUpload
          {...register(name, { required })}
          name={name}
          type="file"
          accept="img/png"
          theme={theme}
        ></StyledUpload>
      </StyledLabel>
      <Box
        display="flex"
        alignContent="center"
        justifyContent="center"
        width="10%"
        padding="0"
        margin="0"
      >
        <Icon model="xmark" type="solid" font-size="20px" />
      </Box>
    </Box>
  );
}

const StyledLabel = styled('label')`
  background-color: ${({ theme }) => theme.baseLight};
  border: 2px ${({ theme }) => theme.baseLighter} solid;
  padding: 0.5em;
  border-radius: 5px;
  margin: 0.5em 0;
  width: 90%;
  box-sizing: border-box;

  &:hover {
    border: 2px solid ${({ theme }) => theme.baseLightest};
  }
`;

const StyledUpload = styled('input')<{ theme: typeof ThemeContext }>`
  &[type='file'] {
    display: none;
  }
`;
