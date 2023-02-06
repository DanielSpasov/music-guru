import { ReactNode, useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';

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
  const { colors } = useContext(ThemeContext);

  return (
    <Box>
      {icon ? (
        <Icon
          padding="15px 10px"
          fontSize="26px"
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
        minWidth="90px"
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
