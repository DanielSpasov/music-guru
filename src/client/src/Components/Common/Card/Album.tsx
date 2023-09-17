import { ThemeContext } from 'styled-components';
import { useContext, useState } from 'react';

import { Album } from '../../../Pages/albums/helpers';
import { Box, Image, Text } from '../../HTML';
import { CardProps } from './helpers';

export default function AlbumCard({ data, onClick }: CardProps<Album>) {
  const [hover, setHover] = useState(false);

  const { colors } = useContext(ThemeContext);

  return (
    <Box
      margin="1em"
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="200px"
    >
      <Box
        display="flex"
        justifyContent="center"
        width="200px"
        height="200px"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <Box
          height="100%"
          width="99%"
          position="absolute"
          top="0"
          borderRadius="15px"
          backgroundColor={colors.primary}
        />
        <Image
          src={data.image}
          onClick={onClick}
          width="100%"
          height="100%"
          position="absolute"
          top={hover ? '-10px' : '0'}
          borderRadius="15px"
        />
      </Box>
      <Text
        padding="10px"
        fontSize="18px"
        textAlign="center"
        onClick={onClick}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        color={hover ? colors.primary : colors.text}
      >
        {data.name}
      </Text>
    </Box>
  );
}
