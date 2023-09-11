import styled, { keyframes } from 'styled-components';
import { Theme } from '../../Core/ThemeSwitcher/helpers';
import { Box } from '../../HTML';

const Animation = keyframes`
  0%,
  100% {
    background-color: #404040;
  }
  50% {
    background-color: #3a3a3a;
  }
`;

const AnimatedBox = styled(Box)<{ theme: Theme }>`
  animation: ${Animation} 1s infinite;
`;

function CardSkeleton() {
  return (
    <Box margin="1em" display="flex" flexDirection="column" alignItems="center">
      <AnimatedBox width="200px" height="200px" borderRadius="1em" />
      <AnimatedBox width="60px" height="20px" margin=".5em" />
    </Box>
  );
}

export default function Skeleton() {
  return (
    <>
      {Array(15)
        .fill(null)
        .map((_, i) => (
          <CardSkeleton key={i} />
        ))}
    </>
  );
}
