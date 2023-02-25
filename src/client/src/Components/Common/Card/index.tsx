import { useContext, useState } from 'react';

import { ThemeContext } from 'styled-components';
import { Box, Image, Text } from '../../';
import { CardProps } from './helpers';

export default function Card({ title, image, onClick }: CardProps) {
  const { colors } = useContext(ThemeContext);
  const [hover, setHover] = useState(false);

  return (
    <Box margin="1em" display="flex" flexDirection="column" alignItems="center">
      <Box
        width="200px"
        height="200px"
        display="flex"
        justifyContent="center"
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
          src={image}
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
        onClick={onClick}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        color={hover ? colors.primary : colors.text}
      >
        {title}
      </Text>
    </Box>
  );
}
