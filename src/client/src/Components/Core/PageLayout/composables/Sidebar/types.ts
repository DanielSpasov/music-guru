import { PageLayoutProps } from '../../types';

export type SidebarProps = Pick<
  PageLayoutProps,
  'hideNavbar' | 'links' | 'hideResourses'
>;
