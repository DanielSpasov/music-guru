import { IconModel } from '../../HTML/Icon/Icons';

export type Action = {
  icon: IconModel;
  perform: (props: any) => any;
  disabled?: boolean;
};

export type ActionsProps = {
  actions: Action[];
};
