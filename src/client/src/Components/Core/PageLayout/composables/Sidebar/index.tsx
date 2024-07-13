import { useLocation } from 'react-router-dom';
import { FC, memo } from 'react';

import { IArtist, IAlbum, ISong, IRight, IHouse } from '../../../../Icons';
import useRecentlyViewed from '../../../../../Hooks/useRecentlyViewed';
import { activeIconColor, iconColor, icons } from './icons';
import { Category, Link } from '../../../../Common';
import { SidebarProps } from './types';

const Sidebar: FC<SidebarProps> = ({
  hideResourses,
  hideNavbar,
  hideRecent,
  links
}) => {
  const { recentlyViewed } = useRecentlyViewed();

  const { pathname } = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 p-2 pl-4 border-r-[1px] overflow-y-scroll dark:border-r-neutral-700 ${
        !hideNavbar ? 'mt-16' : ''
      }`}
      data-testid="sidebar"
    >
      {!hideResourses && (
        <Category title="Resources" data-testid="resources">
          <Link
            isActive={pathname === '/artists'}
            iconColor={
              pathname === '/artists'
                ? activeIconColor['artists']
                : iconColor['artists']
            }
            type="dropdown-link"
            Icon={IArtist}
            to="/artists"
          >
            Artists
          </Link>
          <Link
            isActive={pathname === '/albums'}
            iconColor={pathname === '/albums' ? activeIconColor['albums'] : ''}
            type="dropdown-link"
            Icon={IAlbum}
            to="/albums"
          >
            Albums
          </Link>
          <Link
            isActive={pathname === '/songs'}
            iconColor={pathname === '/songs' ? activeIconColor['songs'] : ''}
            type="dropdown-link"
            Icon={ISong}
            to="/songs"
          >
            Songs
          </Link>
        </Category>
      )}

      {!hideRecent && (
        <Category title="Recently Viewed" data-testid="recently-viewed">
          {recentlyViewed.map(({ to, name }, i) => {
            const model = to.split('/')[1];

            const Icon = to === '/' ? IHouse : icons[model] || IRight;
            const color =
              to === pathname
                ? to === '/'
                  ? activeIconColor['artists']
                  : activeIconColor[model]
                : iconColor[model];

            return (
              <Link
                key={i}
                type="dropdown-link"
                to={to}
                Icon={Icon}
                data-testid={`recent-${i}`}
                isActive={to === pathname}
                iconColor={color}
              >
                {name}
              </Link>
            );
          })}
        </Category>
      )}

      {links?.map((group, groupIndex) => (
        <Category
          key={groupIndex}
          title={group.title}
          separate={group.separate}
          data-testid={`links-${groupIndex}`}
        >
          {group.links.map((link, linkIndex) => (
            <Link
              key={linkIndex}
              isActive={pathname === link.to}
              iconColor={
                pathname === link.to
                  ? link?.activeIconColor ||
                    '[&>path]:fill-primary dark:[&>path]:fill-primary-dark'
                  : link?.iconColor ||
                    '[&>path]:fill-black dark:[&>path]:fill-white'
              }
              type="dropdown-link"
              Icon={link.Icon}
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
        </Category>
      ))}
    </aside>
  );
};

export default memo(Sidebar);
