export type IRoute = {
  path: string;
  filePath: string;
  private: boolean;
};

export type Action = {
  perform: Function;
  disabled?: boolean;
  label?: string;
  icon?: {
    model: string;
    type: string;
  };
};
