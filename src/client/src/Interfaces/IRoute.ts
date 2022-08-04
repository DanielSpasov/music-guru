import pages from '../Pages';
export interface IRoute {
  path: string;
  isPrivate: boolean;
  component: keyof typeof pages;
  children?: IRoute[];
}
