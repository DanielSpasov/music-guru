import { PopoverProps } from './helpers';
import { Box, Icon } from '../../HTML';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

export default function Popover({
  children,
  open,
  setOpen,
  ...css
}: PopoverProps) {
  const { colors } = useContext(ThemeContext);

  return (
    <Box
      boxShadow="rgba(0, 0, 0, 0.45) 0px 0px 5px 3px"
      transform={open ? 'scale(1)' : 'scale(0)'}
      backgroundColor={colors.base}
      opacity={open ? '1' : '0'}
      position="absolute"
      overflowY="auto"
      maxHeight="600px"
      padding="0.5em"
      zIndex="9999"
      top="60px"
      right="0"
      {...css}
    >
      <Box display="flex" justifyContent="flex-end">
        {setOpen && (
          <Icon
            model="x"
            type="solid"
            variant="danger"
            onClick={() => setOpen(false)}
          />
        )}
      </Box>
      {children}
    </Box>
  );
}
