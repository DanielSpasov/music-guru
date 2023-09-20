import { ThemeContext } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';

import { Box, Image, Link, Search, Popover, Icon } from '../../';
import { AuthContext } from '../../../Contexts/Auth';
import ThemeSwitcher from '../ThemeSwitcher';

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);
  const { pathname } = useLocation();

  const [openTheme, setOpenTheme] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      flexWrap="no-wrap"
      alignItems="center"
      height="60px"
      width="100%"
      backgroundColor={colors.base}
      borderRadius="0"
      boxShadow="rgba(0, 0, 0, 0.45) 0px 3px 4px"
      zIndex="9999"
    >
      <Box height="60px">
        <Link to="/" height="60px" padding="0">
          <Image
            src="/images/logo/blue-logo192.png"
            alt="Music Nerd"
            width="60px"
            height="60px"
          />
        </Link>
      </Box>
      <Box height="60px" display="flex" alignContent="center">
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
      </Box>
      <Box display="flex" alignItems="center" height="60px">
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
          {isAuthenticated && <Link to="/me">User</Link>}
          {!isAuthenticated && <Link to="/sign-in">Sign In</Link>}
          {!isAuthenticated && <Link to="/sign-up">Sign Up</Link>}
          {isAuthenticated && <Link to="/sign-out">Sign Out</Link>}
        </Popover>
      </Box>
    </Box>
  );
}
