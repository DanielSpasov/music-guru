import { Colors } from '../../Core/ThemeSwitcher/helpers';
import { Icons, IconModel as IconModels } from './Icons';
export { default as SVG } from './SVG';

export type IconProps = {
  model: IconModels;
  variant?: keyof Colors;
  size?: string;
  [css: string]: any;
};

export type IconModel = IconModels;

export default ({ model, ...props }: IconProps) => Icons[model]?.(props);
