import { ImgHTMLAttributes } from 'react';

export type ImageShape = 'circle' | 'square';

export type ImageProps = {
  src: string;
  editable?: boolean;
  shape?: ImageShape;
  updateFn?: (file: File) => Promise<void>;
} & ImgHTMLAttributes<HTMLImageElement>;
