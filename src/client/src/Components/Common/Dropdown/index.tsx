import { useState, useCallback } from 'react';

import { Box, Icon, Popover } from '../../';
import { DropdownProps } from './helpers';

export default function Dropdown({
  children,
  label,
  icon,
  openOnHover = false,
  disabled = false
}: DropdownProps) {
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
      padding="0 0.75em"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {icon ? (
        <Icon disabled={disabled} model={icon} onClick={onClick} />
      ) : (
        label
      )}
      <Popover open={open} whiteSpace="nowrap">
        {children}
      </Popover>
    </Box>
  );
}
