import { FC, ReactNode } from 'react';

import { ButtonVariant } from '../../Common/Button/types';
import { SVGProps } from '../../Common/SVG/helpers';

export type DefaultActionProps = {
  onClick: (props: any) => any;
  disabled?: boolean;
  hidden?: boolean;
};

export interface IconAction extends DefaultActionProps {
  type: 'icon';
  Icon: FC<SVGProps>;
}

export interface ButtonAction extends DefaultActionProps {
  type: 'button';
  children: ReactNode;
  variant: ButtonVariant;
}

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
