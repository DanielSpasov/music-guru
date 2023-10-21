import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';

import { Link, Search, Popover, Icon } from '../../';
import { AuthContext } from '../../../Contexts/Auth';
import ThemeSwitcher from '../ThemeSwitcher';

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  const { pathname } = useLocation();

  const [openTheme, setOpenTheme] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  return (
    <nav className="h-16 flex justify-between shadow-md shadow-black z-50">
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
        <Search models={['artists', 'songs', 'albums']} width="250px" />

        <Popover
          open={openTheme}
          label={
            <Icon model="theme" onClick={() => setOpenTheme(prev => !prev)} />
          }
        >
          <ThemeSwitcher />
        </Popover>

        <Popover
          open={openUser}
          label={
            <Icon model="user" onClick={() => setOpenUser(prev => !prev)} />
          }
          minWidth="7rem"
          padding=".5em"
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
