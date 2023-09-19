import { Colors } from '../../Core/ThemeSwitcher/helpers';

export type IconProps = {
  model: string;
  variant?: keyof Colors;
  size?: string;
  [css: string]: any;
};
