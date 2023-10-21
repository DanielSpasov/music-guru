import styled from 'styled-components';

import { PopoverProps } from './helpers';
import { Box, Icon } from '../../';

export default function Popover({
  open,
  setOpen,
  label,
  children,
  ...css
}: PopoverProps) {
  return (
    <Box>
      {label && <Box padding=".5em">{label}</Box>}
      <AnimatedBox open={open} className="popover" {...css}>
        <Box display="flex" justifyContent="flex-end">
          {setOpen && (
            <Icon
              model="close"
              variant="danger"
              onClick={() => setOpen(false)}
            />
          )}
        </Box>
        {children}
      </AnimatedBox>
    </Box>
  );
}

const AnimatedBox = styled(Box)`
  background-color: ${({ theme: { colors } }) => colors.base};
  box-shadow: rgba(0, 0, 0, 0.45) 0px 0px 5px 3px;
  position: absolute;
  max-height: 600px;
  overflow-y: auto;
  z-index: 9999;
  top: 1.75em;
  right: 0;

  transform: ${({ open }) => (open ? 'translateY(1.75em)' : 'translateY(3em)')};
  visibility: ${({ open }) => (open ? '' : 'hidden')}; // NOT A SOLUTION
  opacity: ${({ open }) => (open ? '1' : '0')};
`;
