type IconVariant =
  | 'success'
  | 'warning'
  | 'info'
  | 'danger'
  | 'primary'
  | 'secondary';

export type IconProps = {
  model: string;
  variant?: IconVariant;
  size?: string;
  [css: string]: any;
};
