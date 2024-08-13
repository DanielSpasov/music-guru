import { ImageShape } from './types';

export const shapes: Record<ImageShape, string> = {
  circle: 'rounded-full',
  square: 'rounded-lg'
};

export const lightImgProps = 'shadow-neutral-400';
export const darkImgProps = 'dark:shadow-neutral-900';
export const imgProps = `w-full h-full shadow-lg ${lightImgProps} ${darkImgProps}`;

export const hoverProps =
  'cursor-pointer [&+svg]:hover:opacity-100 hover:opacity-60';
