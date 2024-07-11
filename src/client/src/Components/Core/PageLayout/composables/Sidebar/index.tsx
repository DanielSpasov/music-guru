import { useLocation } from 'react-router-dom';
import { FC, memo } from 'react';

import { IArtist, IAlbum, ISong } from '../../../../Icons';
import { Category, Link } from '../../../../Common';
import { SidebarProps } from './types';

const Sidebar: FC<SidebarProps> = ({ hideResourses, hideNavbar, links }) => {
  const { pathname } = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 p-2 pl-4 border-r-[1px] overflow-y-scroll dark:border-r-neutral-700 ${
        !hideNavbar ? 'mt-16' : ''
      }`}
      data-testid="sidebar"
    >
      {!hideResourses && (
        <Category title="Resources">
          <Link
            isActive={pathname === '/artists'}
            iconColor={
              pathname === '/artists'
                ? '[&>path]:fill-primary dark:[&>path]:fill-primary-dark'
                : '[&>path]:fill-black dark:[&>path]:fill-white'
            }
            type="dropdown-link"
            Icon={IArtist}
            to="/artists"
          >
            Artists
          </Link>
          <Link
            isActive={pathname === '/albums'}
            iconColor={
              pathname === '/albums'
                ? '[&>g]:stroke-primary dark:[&>g]:stroke-primary-dark'
                : ''
            }
            type="dropdown-link"
            Icon={IAlbum}
            to="/albums"
          >
            Albums
          </Link>
          <Link
            isActive={pathname === '/songs'}
            iconColor={
              pathname === '/songs'
                ? '[&>g]:stroke-primary dark:[&>g]:stroke-primary-dark'
                : ''
            }
            type="dropdown-link"
            Icon={ISong}
            to="/songs"
          >
            Songs
          </Link>
        </Category>
      )}

      {links?.map((group, groupIndex) => (
        <Category
          key={groupIndex}
          title={group.title}
          separate={group.separate}
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
