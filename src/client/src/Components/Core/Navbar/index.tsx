import { useLocation } from 'react-router-dom';

import { Box, Image, Link, Dropdown } from '../../';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <Box
      display="flex"
      position="absolute"
      justifyContent="space-between"
      flexWrap="no-wrap"
      alignItems="center"
      height="60px"
      width="100%"
      boxShadow="rgba(0, 0, 0, 0.65) 0px 5px 15px"
      zIndex="9999"
    >
      <Box height="60px">
        <Link to="/">
          <Image
            src="images/logo/blue-logo192.png"
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
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
          <Link to="/sign-out">Sign Out</Link>
        </Dropdown>
      </Box>
    </Box>
  );
}
