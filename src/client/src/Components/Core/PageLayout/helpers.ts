import { ReactNode } from 'react';

import { IconModel } from '../../';

export type Action = {
  icon: IconModel;
  onClick: (props: any) => any;
  disabled?: boolean;
  tooltip?: string;
};

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
  tabs?: Tab[];
  loading?: boolean;
};
