import { ThemeContext } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';

import { Box, Image, Link, Dropdown } from '../../';
import { AuthContext } from '../../../Contexts/Auth';

export default function Navbar() {
  const { colors } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { pathname } = useLocation();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      flexWrap="no-wrap"
      alignItems="center"
      height="60px"
      width="100%"
      backgroundColor={colors.base}
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
        <Link
          to="/mixtapes"
          type="navlink"
          isActive={pathname.includes('/mixtapes')}
        >
          Mixtapes
        </Link>
        <Link
          to="/singles"
          type="navlink"
          isActive={pathname.includes('/singles')}
        >
          Singles
        </Link>
      </Box>
      <Box display="flex" alignContent="center" height="60px">
        <Dropdown label="Settings" icon={{ model: 'gear', type: 'solid' }}>
          <Link to="/theme">Theme</Link>
        </Dropdown>
        <Dropdown label="User Settings" icon={{ model: 'user', type: 'solid' }}>
          <Link to="/me">User</Link>
          {!isAuthenticated && <Link to="/sign-in">Sign In</Link>}
          {!isAuthenticated && <Link to="/sign-up">Sign Up</Link>}
          {isAuthenticated && <Link to="/sign-out">Sign Out</Link>}
        </Dropdown>
      </Box>
    </Box>
  );
}
