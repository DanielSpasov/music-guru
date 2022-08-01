export interface IRoute {
  path: string;
  isPrivate: boolean;
  component: string;
  children?: IRoute[];
}
