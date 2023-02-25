import { ThemeContext } from 'styled-components';
import { useContext } from 'react';

import { ThemeProps } from './helpers';
import { Box } from '../../HTML';
import themes from './themes';

export default function ThemeSwitcher() {
  const { setTheme } = useContext(ThemeContext);

  return (
    <Box>
      {Object.entries(themes).map(([name, theme]) => (
        <PreviewTheme key={name} theme={theme} onClick={() => setTheme(name)} />
      ))}
    </Box>
  );
}

const PreviewTheme = ({ theme, onClick }: ThemeProps) => {
  return (
    <Box
      onClick={onClick}
      width="150px"
      height="50px"
      margin=".5em"
      backgroundColor={theme.colors.baseLight}
    >
      <Box pointerEvents="none">
        <Box
          backgroundColor={theme.colors.primary}
          position="absolute"
          width="44px"
          height="44px"
          top="3px"
          left="3px"
        />
        <Box left="50px" position="absolute" width="44px" height="44px">
          <Box
            backgroundColor={theme.colors.secondary}
            height="15px"
            width="48px"
            margin=".2em 0"
          />
          <Box
            height="5px"
            width="42px"
            margin=".2em 0"
            backgroundColor={theme.colors.text}
          />
          <Box
            height="5px"
            width="29px"
            margin=".2em 0"
            backgroundColor={theme.colors.text}
          />
          <Box
            height="5px"
            width="37px"
            margin=".2em 0"
            backgroundColor={theme.colors.text}
          />
        </Box>
        <Box
          backgroundColor={theme.colors.base}
          position="absolute"
          right="3px"
          top="3px"
          width="44px"
          height="44px"
        >
          <Box
            backgroundColor={theme.colors.baseLight}
            position="absolute"
            right="2px"
            top="2px"
            width="18px"
            height="10px"
          />
          <Box
            backgroundColor={theme.colors.baseLighter}
            position="absolute"
            right="2px"
            top="17px"
            width="28px"
            height="10px"
          />
          <Box
            backgroundColor={theme.colors.baseLightest}
            position="absolute"
            bottom="2px"
            left="2px"
            width="40px"
            height="10px"
          />
        </Box>
      </Box>
    </Box>
  );
};
