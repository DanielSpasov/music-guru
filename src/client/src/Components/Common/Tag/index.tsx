import { ThemeContext } from 'styled-components';
import { useContext } from 'react';

import { TagProps } from './helpers';
import { Box } from '../../HTML';

export default function Tag({ children, onClick, variant }: TagProps) {
  const { colors } = useContext(ThemeContext);

  return (
    <Box
      onClick={onClick}
      backgroundColor={variant ? colors[variant] : colors.baseLightest}
      padding=".3em"
      margin=".155em"
      display="flex"
      alignItems="center"
      whiteSpace="nowrap"
      hoverCSS={{
        backgroundColor: onClick ? colors.baseLighter : colors.baseLightest,
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {children}
    </Box>
  );
}
