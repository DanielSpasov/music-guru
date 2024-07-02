import { memo, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { AuthContext } from '../../../Contexts';
import { themeProps } from './styles';
import {
  IAddUser,
  IHamburger,
  ISettings,
  ISignIn,
  ISignOut,
  IUser,
  Link,
  Popover
} from '../../';

// Composables
import DropdownLink from './composables/DropdownLink';
import DarkTheme from './composables/DarkTheme';
import Category from './composables/Category';

const Navbar = () => {
  const { isAuthenticated, data } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  return (
    <nav
      className={`fixed w-full h-20 z-50 flex top-0 p-2 ${themeProps}`}
      data-testid="navbar"
    >
      <div className="flex items-center flex-1">
        <Link to="/">
          <img
            src="/images/logo/blue-logo192.png"
            className="w-16 h-16 min-w-max"
            alt="Music Guru"
          />
        </Link>
      </div>

      <div className="flex items-center justify-center flex-1">
        <Link to="/artists" type="navlink" isActive={pathname === '/artists'}>
          Artists
        </Link>
        <Link to="/albums" type="navlink" isActive={pathname === '/albums'}>
          Albums
        </Link>
        <Link to="/songs" type="navlink" isActive={pathname === '/songs'}>
          Songs
        </Link>
      </div>

      <div className="flex items-center justify-end flex-1">
        <Popover
          open={open}
          label={
            <IHamburger
              data-testid="navbar-user-menu-icon"
              onClick={() => setOpen(prev => !prev)}
            />
          }
        >
          {data && (
            <div className="flex items-center gap-2 p-2 rounded-md">
              <IUser className="bg-neutral-300 w-10 h-10 p-2 rounded-full [&>path]:fill-black" />
              <div
                className="flex flex-col"
                data-testid="navbar-user-menu-username"
              >
                {data.username}
                <span
                  className="text-sm text-neutral-400"
                  data-testid="navbar-user-menu-email"
                >
                  {data.email}
                </span>
              </div>
            </div>
          )}

          <Category separate={isAuthenticated}>
            <DarkTheme />

            <DropdownLink
              data-testid="navbar-user-menu-settings"
              isActive={pathname === '/me'}
              hide={!isAuthenticated}
              Icon={ISettings}
              label="Settings"
              to="/me"
            />
          </Category>

          <Category separate>
            <DropdownLink
              data-testid="navbar-user-menu-sign-out"
              hide={!isAuthenticated}
              isActive={false}
              label="Sign Out"
              Icon={ISignOut}
              to="/sign-out"
            />
            <DropdownLink
              data-testid="navbar-user-menu-sign-in"
              isActive={pathname === '/sign-in'}
              hide={isAuthenticated}
              label="Sign In"
              Icon={ISignIn}
              to="/sign-in"
            />
            <DropdownLink
              data-testid="navbar-user-menu-sign-up"
              isActive={pathname === '/sign-up'}
              hide={isAuthenticated}
              label="Sign Up"
              Icon={IAddUser}
              to="/sign-up"
            />
          </Category>
        </Popover>
      </div>
    </nav>
  );
};

export default memo(Navbar);
