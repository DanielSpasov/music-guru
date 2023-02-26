type Variant = 'danger' | 'info' | 'success' | 'warning';

export type TextProps = {
  children: any;
  variant?: Variant;
  [css: string]: any;
};
