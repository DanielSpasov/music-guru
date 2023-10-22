type Size = 'sm' | 'lg';

export type LoaderProps = {
  type?: 'player' | 'vinyl';
  vinylColor?: string;
  playerColor?: string;
  size?: Size;
};

export type VinylProps = {
  onPlayer?: boolean;
  color?: string;
  size?: Size;
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

export const getSize = (
  size: Size
): {
  recordSize: string;
  centerColoredSize: string;
  centerDotSize: string;
  outterStripeSize: string;
  innerStripeSize: string;
} => {
  switch (size) {
    case 'sm':
      return {
        recordSize: 'w-32 h-32',
        centerColoredSize: 'w-12 h-12 top-10 left-10',
        centerDotSize: 'w-2 h-2 top-5 left-5',
        outterStripeSize: 'w-28 h-28 top-2 left-2 border-[6px]',
        innerStripeSize: 'w-20 h-20 top-2.5 left-2.5 border-[6px]'
      };
    case 'lg':
      return {
        recordSize: 'w-56 h-56',
        centerColoredSize: 'w-24 h-24 top-16 left-16',
        centerDotSize: 'w-4 h-4 top-10 left-10',
        outterStripeSize: 'w-48 h-48 top-4 left-4 border-8',
        innerStripeSize: 'w-36 h-36 top-4 left-4 border-8'
      };
  }
};
