import { ThemeContext } from 'styled-components';
import { useContext } from 'react';

import { Box } from '../../../HTML';
import { Tag } from '../../../Common';

export default function FakeInput({
  values,
  onRemove,
  onClick,
  children
}: {
  values: any[];
  onRemove: (x: any) => any;
  onClick: () => any;
  children: any;
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
      onFocus={onClick}
      onBlur={onClick}
    >
      {values?.map(x => (
        <Tag key={x.uid} onClick={() => onRemove(x)}>
          {x.name}
        </Tag>
      ))}
      {children}
    </Box>
  );
}
