type IconVariant = 'success' | 'warning' | 'info' | 'danger';

export type IconProps = {
  model: string;
  type: string;
  variant?: IconVariant;
  [css: string]: any;
};
