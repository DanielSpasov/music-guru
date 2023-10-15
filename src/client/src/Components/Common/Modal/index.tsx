import styled from 'styled-components';

import { Box, Button, Icon } from '../..';
import { ModalProps } from './helpers';

export default function Modal({
  open,
  type = 'form',
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
      <ModalContent
        type={type}
        transform={`${open ? 'translateY(0em)' : 'translateY(1.25em)'}`}
        visibility={`${open ? '' : 'hidden'}`}
        opacity={`${open ? '1' : '0'}`}
      >
        {showCloseIcon && (
          <Box position="absolute" top="0" right="0">
            <Icon model="close" onClick={onClose} />
          </Box>
        )}
        <Box height={showCloseButton ? '90%' : '100%'}>{children}</Box>
        {showCloseButton && (
          <Box height="10%" display="flex" justifyContent="flex-end">
            <Button variant="danger" onClick={onClose}>
              Close
            </Button>
          </Box>
        )}
      </ModalContent>
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
  width: 35%;

  padding: 0.75em;
  height: ${({ type }) => (type === 'alert' ? '20%' : '50%')};

  position: absolute;
  margin: auto;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
`;
