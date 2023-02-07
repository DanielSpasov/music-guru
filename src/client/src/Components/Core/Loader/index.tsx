import styled, { keyframes } from 'styled-components';
import { getCssProps, LoaderProps, DotProps } from './helpers';
import { Box } from '../../HTML';

export default function Loader({
  fullscreen = false,
  dim = false,
  rainbow = false,
  color = 'white',
  size = 'b'
}: LoaderProps) {
  if (!fullscreen) {
    return <Spinner rainbow={rainbow} color={color} size={size} />;
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      position="fixed"
      top="0"
      left="0"
      display="flex"
      alignContent="center"
      justifyContent="center"
      opacity={dim ? '0.85' : '1'}
      zIndex="9999"
    >
      <Spinner rainbow={rainbow} color={color} size={size} />
    </Box>
  );
}

function Spinner({
  rainbow = false,
  color = 'white',
  size = 'b'
}: Partial<LoaderProps>) {
  return (
    <Box
      display="inline-block"
      position="relative"
      width={size === 's' ? '0px' : '80px'}
      height={size === 's' ? '0px' : '80px'}
      backgroundColor="transparent"
    >
      {getCssProps({ size, color, rainbow }).map((css, i) => (
        <Dot key={i} {...css} />
      ))}
    </Box>
  );
}

const animation = keyframes`
  0%,
  20%,
  80%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
`;

const Dot = styled('div')<DotProps>`
  position: absolute;
  border-radius: 50%;
  animation: ${animation} 1.2s linear infinite;
  width: ${({ size }) => size || '6px'};
  height: ${({ size }) => size || '6px'};
  background: ${({ color }) => color || 'white'};
  top: ${({ top }) => top || '0px'};
  left: ${({ left }) => left || '0px'};
  animation-delay: ${({ delay }) => delay || '0s'};
`;
