import { IconModel } from '../../';

export type Action = {
  icon: IconModel;
  perform: (props: any) => any;
  disabled?: boolean;
};

export type Tab = {
  label: string;
  key: string;
  to: string;
};

export type BreadCrumbProps = {
  actions: Action[];
  tabs: Tab[];
};
