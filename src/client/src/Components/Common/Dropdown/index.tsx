import { useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { DropdownProps } from './helpers';
import { Box, Icon } from '../../';

export default function Dropdown({
  children,
  label,
  icon,
  openOnHover = false,
  disabled = false
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useContext(ThemeContext);

  return (
    <Box height="100%" display="flex" alignItems="center" margin="0 0.75em">
      {icon ? (
        <Icon
          fontSize="1.5em"
          model={icon.model}
          type={icon.type}
          onClick={!disabled && !openOnHover ? () => setIsOpen(!isOpen) : null}
          onMouseOver={!disabled && openOnHover ? () => setIsOpen(true) : null}
          onMouseOut={!disabled && openOnHover ? () => setIsOpen(false) : null}
          color={disabled ? 'gray' : null}
        />
      ) : (
        label
      )}
      <Box
        minWidth="110px"
        width="auto"
        display={isOpen ? 'flex' : 'none'}
        backgroundColor={colors.base}
        flexDirection="column"
        position="absolute"
        top="60px"
        right="0px"
        boxShadow="rgba(0, 0, 0, 0.45) 0px 0px 5px 3px"
        borderRadius="10px"
        padding="0.5em"
        onMouseOver={openOnHover ? () => setIsOpen(true) : () => null}
        onMouseOut={openOnHover ? () => setIsOpen(false) : () => null}
      >
        {children}
      </Box>
    </Box>
  );
}
