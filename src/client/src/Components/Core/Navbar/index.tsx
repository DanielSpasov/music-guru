import { useLocation } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';

import { ThemeContext, AuthContext, Theme } from '../../../Contexts';
import { Link, Search, Popover, Icon } from '../../';

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
    <nav className="h-16 flex justify-between shadow-md shadow-black z-50 dark:bg-neutral-900 bg-blue-600">
      <div className="w-16 h-16">
        <Link to="/">
          <img src="/images/logo/blue-logo192.png" alt="Music Nerd" />
        </Link>
      </div>

      <div className="flex items-center">
        <Link
          to="/artists"
          type="navlink"
          isActive={pathname.includes('/artists')}
        >
          Artists
        </Link>
        <Link
          to="/albums"
          type="navlink"
          isActive={pathname.includes('/albums')}
        >
          Albums
        </Link>
        <Link to="/songs" type="navlink" isActive={pathname.includes('/songs')}>
          Songs
        </Link>
      </div>

      <div className="flex items-center h-16">
        <Search models={['artists', 'songs', 'albums']} />
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
            <Icon model="user" onClick={() => setOpenUser(prev => !prev)} />
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
