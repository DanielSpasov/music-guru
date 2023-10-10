import styled, { keyframes } from 'styled-components';

import { Theme } from '../../Core/ThemeSwitcher/helpers';
import { ModelKeys } from '../../../Api/helpers';
import { SkeletonProps } from './helpers';
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

function CardSkeleton({ model }: { model: ModelKeys }) {
  switch (model) {
    case 'artists':
      return (
        <Box
          margin="1em"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <AnimatedBox width="200px" height="200px" borderRadius="50%" />
          <AnimatedBox width="60px" height="20px" margin=".5em" />
        </Box>
      );
    case 'songs':
      return (
        <Box
          margin="1em"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <AnimatedBox width="200px" height="50px" />
        </Box>
      );
    default:
      return (
        <Box
          margin="1em"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <AnimatedBox width="200px" height="200px" borderRadius="1em" />
          <AnimatedBox width="60px" height="20px" margin=".5em" />
        </Box>
      );
  }
}

export default function Skeleton({ model, length = 15 }: SkeletonProps) {
  return (
    <>
      {Array(length)
        .fill(null)
        .map((_, i) => (
          <CardSkeleton key={i} model={model} />
        ))}
    </>
  );
}
