export type IRoute = {
  path: string;
  filePath: string;
  private: boolean;
};

export type Action = {
  icon: {
    model: string;
    type: string;
  };
  perform: Function;
  disabled?: boolean;
};
