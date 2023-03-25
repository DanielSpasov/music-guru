type IconVariant =
  | 'success'
  | 'warning'
  | 'info'
  | 'danger'
  | 'primary'
  | 'secondary';

export type IconProps = {
  model: string;
  type: string;
  variant?: IconVariant;
  [css: string]: any;
};
