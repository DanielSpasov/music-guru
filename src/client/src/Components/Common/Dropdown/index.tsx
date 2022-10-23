import { ReactNode, useState } from 'react';

import { Box, Icon } from '../../';

type DropdownProps = {
  label: string;
  children: ReactNode;
  icon?: {
    model: string;
    type: string;
  };
  openOnHover?: boolean;
};

export default function Dropdown({
  children,
  label,
  icon,
  openOnHover = false
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      {icon ? (
        <Icon
          padding="15px 10px"
          model={icon.model}
          type={icon.type}
          onClick={!openOnHover ? () => setIsOpen(!isOpen) : () => null}
          onMouseOver={openOnHover ? () => setIsOpen(true) : () => null}
          onMouseOut={openOnHover ? () => setIsOpen(false) : () => null}
        />
      ) : (
        label
      )}
      <Box
        position="absolute"
        borderRadius="10px"
        padding="0.5em"
        top="60px"
        right="0px"
        boxShadow="rgba(0, 0, 0, 0.65) 0px 0px 10px"
        display={isOpen ? 'flex' : 'none'}
        flexDirection="column"
        onMouseOver={openOnHover ? () => setIsOpen(true) : () => null}
        onMouseOut={openOnHover ? () => setIsOpen(false) : () => null}
      >
        {children}
      </Box>
    </Box>
  );
}
