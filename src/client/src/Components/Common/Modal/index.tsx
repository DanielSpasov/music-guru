import styled from 'styled-components';

import { ModalProps } from './helpers';
import { Box, Icon } from '../..';

export default function Modal({
  open,
  onClose,
  children,
  closeOnOutsideClick = false,
  showCloseButton = false,
  showCloseIcon = false
}: ModalProps) {
  return (
    <Box
      position="fixed"
      top="0"
      width="100%"
      height="100%"
      zIndex="9999"
      pointerEvents={open ? 'auto' : 'none'}
    >
      <Box
        backgroundColor="black"
        width="100%"
        height="100%"
        opacity={open ? '.75' : '0'}
        cursor="auto"
        {...(closeOnOutsideClick ? { onClick: onClose } : {})}
      />
      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        position="absolute"
        bottom="0"
        right="0"
        left="0"
        top="0"
        transform={`${open ? 'translateY(0em)' : 'translateY(1.25em)'}`}
        visibility={`${open ? '' : 'hidden'}`}
        opacity={`${open ? '1' : '0'}`}
      >
        <ModalContent>
          {showCloseIcon && (
            <Box position="absolute" top="0" right="0">
              <Icon model="close" onClick={onClose} />
            </Box>
          )}
          {children}
          {showCloseButton && (
            <Box display="flex" justifyContent="flex-end">
              <button className="bg-red-500" onClick={onClose}>
                Close
              </button>
            </Box>
          )}
        </ModalContent>
      </Box>
    </Box>
  );
}

const ModalContent = styled(Box)`
  box-sizing: content-box;
  background-color: ${({ theme: { colors } }) => colors.base};
  box-shadow: rgba(0, 0, 0, 0.65) 0px 0px 5px;
  overflow-x: hidden;
  overflow-y: auto;
  min-width: 400px;
  padding: 0.75em;
  width: 35%;
`;
