export type ActionType = 'action' | 'menu';

export type Action = {
  icon: string;
  type?: ActionType;
  subActions?: SubAction[];
  perform: (props: any) => any;
  disabled?: boolean;
};

export type SubAction = {
  label: string;
  perform: (props: any) => any;
  disabled?: boolean;
};

export type ActionsProps = {
  actions: Action[];
};

export type ActionProps = {
  action: Action;
};
export type SubActionProps = {
  action: SubAction;
};
