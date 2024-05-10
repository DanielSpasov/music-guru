import { ReactNode } from 'react';

import { IconModel } from '../../';
import { ButtonVariant } from '../../Common/Button/types';

export type DefaultActionProps = {
  onClick: (props: any) => any;
  disabled?: boolean;
  hidden?: boolean;
};

export interface IconAction extends DefaultActionProps {
  type: 'icon';
  icon: IconModel;
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
  showNavbar?: boolean;
  showHeader?: boolean;
  children?: ReactNode;
  actions?: Action[];
  loading?: boolean;
};
