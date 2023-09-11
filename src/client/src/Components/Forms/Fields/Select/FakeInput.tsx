import { ThemeContext } from 'styled-components';
import { Dispatch, SetStateAction, useContext } from 'react';

import { Box } from '../../../HTML';
import { Tag } from '../../../Common';

export default function FakeInput({
  values,
  onRemove,
  setOpen,
  children
}: {
  values: any[];
  onRemove: (x: any) => any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: any;
}) {
  const { colors } = useContext(ThemeContext);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      margin="0.5em 0"
      minHeight="38px"
      backgroundColor={colors.baseLight}
      border={`2px solid ${colors.baseLighter}`}
      tabIndex="-1"
      onFocus={() => {
        setOpen(true);
      }}
      onBlur={() => {
        setOpen(false);
      }}
    >
      {values?.map(x => (
        <Tag key={x.uid} onRemove={() => onRemove(x)}>
          {x.name}
        </Tag>
      ))}
      {children}
    </Box>
  );
}
