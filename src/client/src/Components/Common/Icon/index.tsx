import { ReactNode } from 'react';

import { Icons, IconModel as IconModels } from './Icons';

export { default as SVG } from './SVG';

export type IconProps = {
  model: IconModels;
  variant?: string;
  viewBox?: string;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: any;
};
export type SVGProps = Omit<IconProps, 'model'>;

export type IconModel = IconModels;

export default ({ model, ...props }: IconProps) => Icons[model]?.(props);
