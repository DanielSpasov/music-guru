import { useCallback, useContext, useState, useMemo } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../../../Contexts/Theme';
import { FileInputProps } from './helpers';
import { Box, Icon } from '../../HTML';
import Label from '../Label';

export default function FileInput({
  register,
  required = false,
  name,
  label
}: FileInputProps) {
  const theme = useContext(ThemeContext);
  const [fileName, setFileName] = useState('');
  const [dragOver, setDragOver] = useState<boolean>(false);

  const dragCss = useMemo(
    () => (dragOver ? { border: `2px ${theme.baseLightest} dashed` } : {}),
    [theme.baseLightest, dragOver]
  );

  const inputHoverCss = useMemo(
    () => ({
      'pointer-events': 'none',
      '&:hover': { cursor: dragOver ? '' : 'pointer' }
    }),
    [dragOver]
  );

  const handleFileChange = useCallback((e: any) => {
    if (!e.target.files.length) {
      setFileName('');
      return;
    }
    setFileName(e.target.files[0].name);
  }, []);

  const handleFileDrop = useCallback((e: any) => {
    console.log(e);
    setDragOver(false);
  }, []);

  return (
    <Box display="flex" alignContent="center">
      <Label position="absolute" top="0" left="0">
        {label}
      </Label>
      <StyledLabel
        theme={theme}
        onDragEnter={() => setDragOver(true)}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleFileDrop}
        {...dragCss}
      >
        <Label
          position="absolute"
          zIndex="2"
          inline-size="96%"
          overflow="hidden"
          text-overflow="ellipsis"
        >
          {fileName}
        </Label>
        <Box background="transparent" display="flex" justifyContent="center">
          <Icon
            model="cloud-upload"
            type="solid"
            color={theme.baseLighter}
            font-size="34px"
            position="absolute"
            zIndex="1"
            {...inputHoverCss}
          />
        </Box>
        <StyledUpload
          {...register(name, { required, onChange: handleFileChange })}
          name={name}
          type="file"
          accept="img/png"
          theme={theme}
          multiple={false}
        />
      </StyledLabel>
    </Box>
  );
}

const StyledLabel = styled('label')<any>`
  background-color: ${({ theme }) => theme.baseLight};
  border: 2px ${({ theme }) => theme.baseLighter} solid;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 0.5em 0;
  padding: 0.5em;
  height: 60px;
  width: 100%;

  &:hover {
    border: 2px ${({ theme }) => theme.baseLightest} dashed;
    cursor: pointer;
  }

  ${css => ({ ...css })}
`;

const StyledUpload = styled('input')<{ theme: typeof ThemeContext }>`
  &[type='file'] {
    display: none;
  }
`;
