import { useLocation } from 'react-router-dom';

import { Box, Image, Link } from '../Components';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="60px"
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
          to="artists"
          type="navlink"
          isActive={pathname.includes('/artists')}
        >
          Artists
        </Link>
        <Link
          to="albums"
          type="navlink"
          isActive={pathname.includes('/albums')}
        >
          Albums
        </Link>
        <Link
          to="mixtapes"
          type="navlink"
          isActive={pathname.includes('/mixtapes')}
        >
          Mixtapes
        </Link>
        <Link
          to="singles"
          type="navlink"
          isActive={pathname.includes('/singles')}
        >
          Singles
        </Link>
      </Box>

      <Box>
        <Box>
          <Link to="theme">Theme</Link>
        </Box>
        <Box>
          <Link to="me">User</Link>
          <Link to="sign-in">Sign In</Link>
          <Link to="sign-up">Sign Up</Link>
          <Link to="sign-out">Sign Out</Link>
        </Box>
      </Box>
    </Box>
  );
}
