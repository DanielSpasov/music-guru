import { NavLink } from 'react-router-dom';
import { Box, Image } from '../Components';

export default function Navbar() {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Image
          src="images/logo/blue-logo192.png"
          alt="Music Nerd"
          size="80px"
        />
      </Box>

      <Box>
        <NavLink to="artists">Artists</NavLink>
        <NavLink to="albums">Albums</NavLink>
        <NavLink to="mixtapes">Mixtapes</NavLink>
        <NavLink to="singles">Singles</NavLink>
      </Box>

      <Box>
        <Box>
          <NavLink to="theme">Theme</NavLink>
        </Box>
        <Box>
          <NavLink to="me">User</NavLink>
          <NavLink to="sign-in">Sign In</NavLink>
          <NavLink to="sign-up">Sign Up</NavLink>
          <NavLink to="sign-out">Sign Out</NavLink>
        </Box>
      </Box>
    </Box>
  );
}
