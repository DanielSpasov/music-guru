import { ThemeContext } from 'styled-components';
import { useState, useContext } from 'react';

import { Song } from '../../../Pages/songs/helpers';
import { Box, Image, Text } from '../../HTML';
import { CardProps } from './helpers';

export default function SongCard({ data, onClick }: CardProps<Song>) {
  const { colors } = useContext(ThemeContext);

  const [hover, setHover] = useState(false);

  return (
    <Box
      boxSizing="content-box"
      display="flex"
      alignItems="center"
      width="200px"
      height="50px"
      padding=".5em"
      backgroundColor={hover ? colors.baseLightest : ''}
      onClick={onClick}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <Image
        src={data?.image || '/images/logo/blue-logo-square512.png'}
        height="50px"
        width="50px"
        onClick={onClick}
        borderRadius="5px"
      />

      <Box
        padding="0 .5em"
        height="50px"
        pointerEvents="none"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Text fontSize="18px" color={colors.text}>
          {data.name}
        </Text>
      </Box>
    </Box>
  );
}
