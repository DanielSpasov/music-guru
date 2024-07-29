import { PageLayoutProps } from '../../types';

export type SidebarProps = Pick<
  PageLayoutProps,
  'hideNavbar' | 'links' | 'hideResourses' | 'hideRecent'
>;

export type RecentItem = {
  to: string;
  name: string;
};
