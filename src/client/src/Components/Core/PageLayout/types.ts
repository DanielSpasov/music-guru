import { BaseSyntheticEvent, ElementType, FC, ReactNode } from 'react';

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

export type Link = {
  to: string;
  label: string;
  Icon: ElementType;
  iconColor?: string;
  activeIconColor?: string;
};

export type LinkGroup = {
  title?: string;
  separate?: boolean;
  links: Link[];
};

export type PageLayoutProps = {
  // Page
  title: string;
  heading?: string;
  loading?: boolean;
  children?: ReactNode;
  // Navbar
  hideNavbar?: boolean;
  // Header
  hideHeader?: boolean;
  actions?: Action[];
  // Sidebar
  hideResourses?: boolean;
  hideSidebar?: boolean;
  links?: LinkGroup[];
};
