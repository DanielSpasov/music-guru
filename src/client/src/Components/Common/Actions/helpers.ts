export type ActionType = 'action' | 'menu';

export type Action = {
  icon: {
    model: string;
    type: string;
  };
  type?: ActionType;
  subActions?: SubAction[];
  perform: Function;
  disabled?: boolean;
};

export type SubAction = {
  label: string;
  perform: Function;
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
