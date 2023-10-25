import { ModelKeys } from '../../../Api/helpers';
import { SkeletonProps } from './helpers';

function CardSkeleton({ model }: { model: ModelKeys }) {
  switch (model) {
    case 'artists':
      return (
        <div className="flex flex-col items-center bg-neutral-300 dark:bg-neutral-900 rounded-md m-3 shadow-md animate-pulse">
          <div className="bg-neutral-200 dark:bg-neutral-700 w-40 h-40 m-2 rounded-md" />
          <div className="bg-neutral-300 dark:bg-neutral-900 w-44 h-9 p-2 rounded-b-md" />
        </div>
      );
    case 'songs':
      return (
        <div className="w-52 h-20 m-2 bg-neutral-800 rounded-md animate-pulse" />
      );
    default:
      return (
        <div className="flex flex-col items-center m-4 animate-pulse">
          <div className="bg-neutral-800 w-48 h-48 rounded-md" />
          <div className="bg-neutral-800 w-16 h-6 m-1 rounded-md" />
        </div>
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
