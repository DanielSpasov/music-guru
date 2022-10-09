import { useContext, useEffect, useState } from 'react';

import { Box, Image, Link } from '../Components';
import { ThemeContext } from '../Contexts/Theme';

export default function Navbar() {
  const { base } = useContext(ThemeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="60px"
      backgroundColor={base}
    >
      <Box height="60px">
        <Link to="/" variant="image">
          <Image
            src="images/logo/blue-logo192.png"
            alt="Music Nerd"
            size="60px"
          />
        </Link>
      </Box>

      <NavLinkControls>
        <Link to="artists">Artists</Link>
        <Link to="albums">Albums</Link>
        <Link to="mixtapes">Mixtapes</Link>
        <Link to="singles">Singles</Link>
      </NavLinkControls>

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

function NavLinkControls({ children }: { children: any }) {
  const [dimensions, setDimensions] = useState({});
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    console.log(children[0].clientWidth);
    (() => {
      setDimensions(
        children.reduce(
          (acc: Object, curr: any) => ({
            ...acc,
            [curr.props.to]: {
              width: curr.clientWidth,
              height: curr.clientHeight
            }
          }),
          {}
        )
      );
    })();
  }, [children]);

  console.log(dimensions);

  return (
    <Box>
      <Box
        position="absolute"
        backgroundColor="white"
        // @ts-ignore
        width={activeLink && dimensions[activeLink]?.width}
        // @ts-ignore
        height={activeLink && dimensions[activeLink]?.height}
      />
      {children}
    </Box>
  );
}
