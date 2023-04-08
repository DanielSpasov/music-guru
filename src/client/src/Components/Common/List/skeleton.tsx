import styled, { keyframes } from 'styled-components';
import { Theme } from '../../Core/ThemeSwitcher/helpers';

const Animation = keyframes`
  0%,
  100% {
    background-color: #404040;
  }
  50% {
    background-color: #3a3a3a;
  }
`;

const CardSkeleton = styled('div')<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.colors.baseLighter};
  width: 200px;
  height: 200px;
  margin: 1em;
  border-radius: 15px;
  animation: ${Animation} 1s infinite;
`;

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
