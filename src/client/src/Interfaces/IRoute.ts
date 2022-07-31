export interface IRoute {
  title: string;
  path: string;
  isPrivate: boolean;
  component: string;
  children?: IRoute[];
}
