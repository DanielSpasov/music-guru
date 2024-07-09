import { BaseSyntheticEvent, FC, ReactNode } from 'react';

import { ButtonVariant } from '../../Common/Button/types';
import { SVGProps } from '../../Common/SVG/helpers';

export type DefaultActionProps = {
  onClick: (e: BaseSyntheticEvent) => void;
  disabled?: boolean;
  hidden?: boolean;
};

export type IconAction = DefaultActionProps & {
  type: 'icon';
  Icon: FC<SVGProps>;
};

export type ButtonAction = DefaultActionProps & {
  type: 'button';
  children: ReactNode;
  variant: ButtonVariant;
};

export type Action = IconAction | ButtonAction;

export type Tab = {
  label: string;
  key: string;
  to: string;
};

export type PageLayoutProps = {
  title: string;
  heading?: string;
  hideNavbar?: boolean;
  hideHeader?: boolean;
  hideSidebar?: boolean;
  children?: ReactNode;
  actions?: Action[];
  loading?: boolean;
};
