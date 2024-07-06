import { Size, VinylSize } from './types';

export const onPlayerProps = 'top-4 -left-16';

export const stripeProps = `
border-l-neutral-800 dark:border-l-neutral-900
border-t-neutral-700 dark:border-t-neutral-800
border-b-neutral-700 dark:border-b-neutral-800
border-r-neutral-800 dark:border-r-neutral-900
rounded-full
`;

type VinylPropType =
  | 'record'
  | 'recordLabel'
  | 'centerHole'
  | 'outterStripe'
  | 'innerStripe';

export const vinyl: Record<VinylSize, Record<VinylPropType, string>> = {
  lg: {
    record: 'w-56 h-56',
    recordLabel: 'w-24 h-24 top-16 left-16',
    centerHole: 'w-4 h-4 top-10 left-10',
    outterStripe: 'w-48 h-48 top-4 left-4 border-8',
    innerStripe: 'w-36 h-36 top-4 left-4 border-8'
  },
  sm: {
    record: 'w-32 h-32',
    recordLabel: 'w-12 h-12 top-10 left-10',
    centerHole: 'w-2 h-2 top-5 left-5',
    outterStripe: 'w-28 h-28 top-2 left-2 border-[6px]',
    innerStripe: 'w-20 h-20 top-2.5 left-2.5 border-[6px]'
  }
};

export const spinner: Record<Size, string> = {
  lg: 'w-16 h-16',
  sm: 'w-8 h-8',
  xsm: 'w-4 h-4'
};

const COLORS = [
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-green-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-blue-500',
  'bg-violet-500',
  'bg-fuchsia-500',
  'bg-pink-500'
];

export const getColor = (input: string): string => {
  if (input !== 'random') return input;
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};
