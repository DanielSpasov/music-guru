export type IRoute = {
  path: string;
  filePath: string;
  private?: boolean;
  routes?: IRoute[];
};
