import { ThemeContext } from 'styled-components';
import { useContext } from 'react';

import { TagProps } from './helpers';
import { Box, Icon } from '../../HTML';

export default function Tag({ children, onRemove, variant }: TagProps) {
  const { colors } = useContext(ThemeContext);

  return (
    <Box
      backgroundColor={variant ? colors[variant] : colors.baseLightest}
      padding=".3em"
      margin=".155em"
      display="flex"
      alignItems="center"
      alignContent="center"
      whiteSpace="nowrap"
      hoverCSS={{ backgroundColor: colors.baseLighter, cursor: 'default' }}
    >
      {children}
      {onRemove && <Icon model="close" variant="danger" onClick={onRemove} />}
    </Box>
  );
}
