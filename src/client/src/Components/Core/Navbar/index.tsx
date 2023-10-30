import { useLocation } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';

import { ThemeContext, AuthContext, Theme } from '../../../Contexts';
import { Link, Search, Popover, Icon } from '../../';

const darkProps = 'dark:bg-neutral-950 dark:shadow-sm dark:shadow-neutral-950';

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
    <nav className={`relative h-16 flex ${darkProps}`}>
      <div className="flex-1">
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

      <div className="flex items-center justify-end h-16 flex-1">
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
