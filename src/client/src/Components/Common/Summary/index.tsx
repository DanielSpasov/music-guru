import { useCallback, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';

import { Box, Heading, Icon } from '../../HTML';
import { SummaryProps } from './helpers';

export default function Summary({
  children,
  label,
  open = false
}: SummaryProps) {
  const { colors } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState<boolean>(open);

  const toggleSummary = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <Box
      width="100%"
      onHover={{ backgroundColor: colors.baseLighter }}
      padding="0.5em"
      position="relative"
    >
      <Box display="flex" alignItems="center" onClick={toggleSummary}>
        <Icon model={isOpen ? 'chevron-up' : 'chevron-down'} type="solid" />
        <Heading title={label} size="medium" textAlign="start" />
      </Box>
      {isOpen && <Box>{children}</Box>}
    </Box>
  );
}
