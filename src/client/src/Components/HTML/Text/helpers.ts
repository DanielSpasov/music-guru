import { Colors } from '../../Core/ThemeSwitcher/helpers';

export type TextProps = {
  children?: any;
  variant?: keyof Colors;
  className?: string;
  [css: string]: any;
};
