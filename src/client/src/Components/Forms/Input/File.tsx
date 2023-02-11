import { useCallback, useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { FileInputProps } from './helpers';
import { Box, Icon } from '../../HTML';
import { border } from '../../helpers';
import Label from '../Label';

export default function FileInput({
  register,
  required = false,
  name,
  label
}: FileInputProps) {
  const { colors } = useContext(ThemeContext);
  const [fileName, setFileName] = useState('');
  const [dragOver, setDragOver] = useState<boolean>(false);

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
      <DropZone
        onDragEnter={() => setDragOver(true)}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleFileDrop}
        border={dragOver ? `2px ${colors.baseLightest} dashed` : null}
      >
        <Label>{fileName}</Label>
        <Box background="transparent" display="flex" justifyContent="center">
          <Icon
            model="cloud-upload"
            type="solid"
            color={colors.baseLighter}
            fontSize="34px"
          />
        </Box>
        <StyledUpload
          {...register(name, { required, onChange: handleFileChange })}
          name={name}
          type="file"
          accept="img/png"
          multiple={false}
        />
      </DropZone>
    </Box>
  );
}

const DropZone = styled('label')<any>`
  border: 2px ${({ theme: { colors } }) => colors.baseLighter} solid;
  background-color: ${({ theme: { colors } }) => colors.baseLight};
  border-radius: 5px;
  padding: 0.5em;
  height: 60px;
  width: 100%;
  max-width: 95.5%;

  ${border}

  &:hover {
    border: 2px ${({ theme: { colors } }) => colors.baseLightest} dashed;
    cursor: pointer;
  }
`;

const StyledUpload = styled('input')`
  &[type='file'] {
    display: none;
  }
`;
