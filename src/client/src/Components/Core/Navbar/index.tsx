import { useLocation } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';

import { ThemeContext, AuthContext, Theme } from '../../../Contexts';
import { Link, Popover, Icon } from '../../';

const lightProps = 'bg-neutral-50 border-b-[1px]';
const darkProps =
  'dark:bg-neutral-950 dark:border-none dark:shadow-sm dark:shadow-neutral-950';
const themeProps = `${lightProps} ${darkProps}`;

const userMenuDarkProps = 'dark:border-neutral-900 dark:border-0';
const userMenuDarkHoverProps =
  'dark:[&>svg>path]:hover:text-primary-dark dark:hover:bg-neutral-900 ';
const userMenuLightHoverProps =
  '[&>svg>path]:hover:text-secondary hover:shadow-sm';
const userMenuHoverProps = `${userMenuDarkHoverProps} ${userMenuLightHoverProps}`;

const userMenuProps = `${userMenuDarkProps} ${userMenuHoverProps}`;

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { pathname } = useLocation();

  const [animateTheme, setAnimateTheme] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const toggleTheme = useCallback(() => {
    const currentTheme = localStorage.getItem('theme');
    setAnimateTheme(true);

    if (currentTheme === 'dark') {
      localStorage.setItem('theme', 'light');
      return;
    }
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <nav className={`fixed w-full h-20 z-50 flex px-10 ${themeProps}`}>
      <div className="flex items-center flex-1 p-4">
        <Link to="/">
          <img
            src="/images/logo/blue-logo192.png"
            className="w-16 h-16"
            alt="Music Guru"
          />
        </Link>
      </div>

      <div className="flex items-center justify-center flex-1">
        <Link
          to="/artists"
          type="navlink"
          isActive={pathname.split('/')[1] === 'artists'}
        >
          Artists
        </Link>
        <Link
          to="/albums"
          type="navlink"
          isActive={pathname.split('/')[1] === 'albums'}
        >
          Albums
        </Link>
        <Link
          to="/songs"
          type="navlink"
          isActive={pathname.split('/')[1] === 'songs'}
        >
          Songs
        </Link>
      </div>

      <div className="flex items-center justify-end flex-1">
        <div
          className={`p-2 ${animateTheme ? 'scale-0 rotate-180' : 'scale-100'}`}
          onTransitionEnd={e => {
            if (e.propertyName !== 'transform') return;
            setTheme(localStorage.getItem('theme') as Theme);
            setAnimateTheme(false);
          }}
        >
          <Icon
            model={theme === 'dark' ? 'dark' : 'light'}
            onClick={toggleTheme}
          />
        </div>

        <Popover
          open={openUser}
          label={
            <div
              onClick={() => setOpenUser(prev => !prev)}
              className={`flex rounded-full px-3 py-2 cursor-pointer border-[1px] ${userMenuProps}`}
            >
              <Icon model="hamburger" />
              <Icon model="user" />
            </div>
          }
          className="w-24"
        >
          <div className="flex flex-col">
            {isAuthenticated && <Link to="/me">User</Link>}
            {!isAuthenticated && <Link to="/sign-in">Sign In</Link>}
            {!isAuthenticated && <Link to="/sign-up">Sign Up</Link>}
            {isAuthenticated && <Link to="/sign-out">Sign Out</Link>}
          </div>
        </Popover>
      </div>
    </nav>
  );
}
