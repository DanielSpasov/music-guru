import { useState, useContext, useCallback } from 'react';
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
  const { colors } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const onClick = useCallback(() => {
    if (disabled || openOnHover) return;
    setOpen(prev => !prev);
  }, [disabled, openOnHover]);

  const onMouseOver = useCallback(() => {
    if (disabled || !openOnHover) return;
    setOpen(true);
  }, [disabled, openOnHover]);

  const onMouseOut = useCallback(() => {
    if (disabled || !openOnHover) return;
    setOpen(false);
  }, [disabled, openOnHover]);

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      margin="0 0.75em"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {icon ? (
        <Icon
          fontSize="1.5em"
          model={icon.model}
          type={icon.type}
          onClick={onClick}
          color={disabled ? 'gray' : null}
        />
      ) : (
        label
      )}
      <Box
        minWidth="110px"
        width="auto"
        display={open ? 'flex' : 'none'}
        backgroundColor={colors.base}
        flexDirection="column"
        position="absolute"
        top="60px"
        right="0px"
        boxShadow="rgba(0, 0, 0, 0.45) 0px 0px 5px 3px"
        borderRadius="10px"
        padding="0.5em"
      >
        {children}
      </Box>
    </Box>
  );
}
