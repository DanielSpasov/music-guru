import { IconModel } from '../../';

export type Action = {
  icon: IconModel;
  perform: (props: any) => any;
  disabled?: boolean;
};

export type ActionsProps = {
  actions: Action[];
};
