import { useContext } from 'react';
import { Box, Icon, Summary, Text } from '../../../Components';
import { ThemeContext } from 'styled-components';
import { OptionMenuProps } from './helpers';

export default function OptionMenu({ icon, label, data }: OptionMenuProps) {
  const { colors } = useContext(ThemeContext);

  return (
    <Box display="flex" alignItems="flex-start" margin=".5em 0">
      <Icon {...icon} color={colors.primary} fontSize="2em" padding=".4em" />
      <Summary label={label}>
        {data.map((x, i) => (
          <Box
            backgroundColor={colors.base}
            padding="1em"
            margin=".5em"
            key={i}
          >
            <Text fontWeight="bold">{x.name}: </Text>
            <Text>{x.value}</Text>
          </Box>
        ))}
      </Summary>
    </Box>
  );
}
