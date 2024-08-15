import { memo, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { AuthContext } from '../../../../../Contexts';
import { themeProps } from './styles';
import {
  IAddUser,
  IHamburger,
  ISettings,
  ISignIn,
  ISignOut,
  IUser,
  Link,
  Popover,
  Category
} from '../../../../';

// Composables
import DarkTheme from './DarkTheme';
import Search from './Search';

const Navbar = () => {
  const { isAuthenticated, data } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  return (
    <nav
      className={`fixed w-full h-16 z-50 flex top-0 p-2 ${themeProps}`}
      data-testid="navbar"
    >
      <section className="flex items-center flex-1">
        <Link to="/" type="link" className="flex items-center gap-2">
          <img
            src="/images/logo/blue-logo192.png"
            className="w-12 h-12 min-w-max"
            alt="Music Guru"
          />

          <h1 className="whitespace-nowrap">Music Guru</h1>
        </Link>
      </section>

      <section className="flex items-center flex-1">
        <Search models={['albums', 'artists', 'songs']} />
      </section>

      <section className="flex items-center justify-end flex-1">
        <Popover
          open={open}
          label={
            <IHamburger
              className="m-2"
              data-testid="navbar-user-menu-icon"
              onClick={() => setOpen(prev => !prev)}
            />
          }
        >
          {data && (
            <div className="flex items-center gap-2 p-2 rounded-md">
              <IUser
                className="w-10 h-10 p-2 rounded-full"
                color="bg-neutral-300 [&>path]:fill-black"
              />
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

            <Link
              iconColor={
                pathname === '/settings/account'
                  ? '[&>path]:fill-primary dark:[&>path]:fill-primary-dark'
                  : '[&>path]:fill-black dark:[&>path]:fill-white'
              }
              type="dropdown-link"
              data-testid="navbar-user-menu-settings"
              isActive={pathname === '/settings/account'}
              hide={!isAuthenticated}
              Icon={ISettings}
              to="/settings/account"
            >
              Settings
            </Link>
          </Category>

          <Category separate>
            <Link
              iconColor="[&>path]:fill-black dark:[&>path]:fill-white"
              data-testid="navbar-user-menu-sign-out"
              type="dropdown-link"
              hide={!isAuthenticated}
              isActive={false}
              Icon={ISignOut}
              to="/sign-out"
            >
              Sign Out
            </Link>
            <Link
              iconColor={
                pathname === '/sign-in'
                  ? '[&>path]:fill-primary dark:[&>path]:fill-primary-dark'
                  : '[&>path]:fill-black dark:[&>path]:fill-white'
              }
              type="dropdown-link"
              data-testid="navbar-user-menu-sign-in"
              isActive={pathname === '/sign-in'}
              hide={isAuthenticated}
              Icon={ISignIn}
              to="/sign-in"
            >
              Sign In
            </Link>
            <Link
              iconColor={
                pathname === '/sign-up'
                  ? '[&>path]:fill-primary dark:[&>path]:fill-primary-dark'
                  : '[&>path]:fill-black dark:[&>path]:fill-white'
              }
              isActive={pathname === '/sign-up'}
              type="dropdown-link"
              data-testid="navbar-user-menu-sign-up"
              hide={isAuthenticated}
              Icon={IAddUser}
              to="/sign-up"
            >
              Sign Up
            </Link>
          </Category>
        </Popover>
      </section>
    </nav>
  );
};

export default memo(Navbar);
