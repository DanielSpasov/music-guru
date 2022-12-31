export type Action = {
  icon: {
    model: string;
    type: string;
  };
  perform: Function;
  disabled?: boolean;
};
