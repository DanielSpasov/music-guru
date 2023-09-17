import { ThemeContext } from 'styled-components';
import { useContext, useState } from 'react';

import { Artist } from '../../../Pages/artists/helpers';
import { Box, Image, Text } from '../../HTML';
import { CardProps } from './helpers';

export default function ArtistCard({ data, onClick }: CardProps<Artist>) {
  const [hover, setHover] = useState(false);

  const { colors } = useContext(ThemeContext);

  return (
    <Box
      margin="1em"
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="200px"
      onClick={onClick}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <Image
        src={data.image}
        onClick={onClick}
        width="200px"
        height="200px"
        borderRadius="50%"
      />

      <Text
        padding="10px"
        fontSize="18px"
        textAlign="center"
        color={hover ? colors.primary : colors.text}
      >
        {data.name}
      </Text>
    </Box>
  );
}
