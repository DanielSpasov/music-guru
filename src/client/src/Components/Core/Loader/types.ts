import { SVGProps } from '../../Common/SVG/helpers';

export type Size = 'xsm' | 'sm' | 'lg';
export type LoaderType = 'player' | 'vinyl' | 'spinner';

export type PlayerProps = {
  type?: Extract<LoaderType, 'player'>;
  color?: string;
  vinylColor?: string;
};

export type VinylSize = Extract<Size, 'sm' | 'lg'>;

export type VinylProps = {
  type?: Extract<LoaderType, 'vinyl'>;
  size?: VinylSize;
  color?: string;
  onPlayer?: boolean;
};

export type SpinnerProps = SVGProps & {
  type?: Extract<LoaderType, 'spinner'>;
  size?: Size;
};

export type LoaderProps = SpinnerProps | PlayerProps | VinylProps;
