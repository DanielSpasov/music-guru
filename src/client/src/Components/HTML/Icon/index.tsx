import { Colors } from '../../Core/ThemeSwitcher/helpers';
import { Icons, IconModel } from './Icons';

export type IconProps = {
  model: IconModel;
  variant?: keyof Colors;
  size?: string;
  [css: string]: any;
};

export default ({ model, ...props }: IconProps) => Icons[model]?.(props);
