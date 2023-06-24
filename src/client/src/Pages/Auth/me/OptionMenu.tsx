import { ThemeContext } from 'styled-components';
import { useContext } from 'react';

import { Box, Button, Icon, Summary, Text } from '../../../Components';
import { MenuOption, OptionMenuProps } from './helpers';

export default function OptionMenu({ icon, label, config }: OptionMenuProps) {
  const { colors } = useContext(ThemeContext);

  return (
    <Box display="flex" alignItems="flex-start" margin=".5em 0">
      <Icon {...icon} color={colors.primary} fontSize="2em" padding=".4em" />
      <Summary label={label} open>
        {config.map((data, i) => (
          <Option data={data} key={i} />
        ))}
      </Summary>
    </Box>
  );
}

function Option({ data }: { data: MenuOption }) {
  const { colors } = useContext(ThemeContext);

  return (
    <Box
      backgroundColor={colors.base}
      padding="1em"
      margin=".5em"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <Text fontWeight="bold">{data.name}: </Text>
        {data?.type === 'boolean' ? (
          <Icon
            model={data?.value ? 'check' : 'x'}
            type="solid"
            color={data?.value ? colors.success : colors.danger}
            padding="0 .5em"
          />
        ) : (
          <Text>{data?.value}</Text>
        )}
      </Box>
      {data?.action && !data?.action?.hide && (
        <Button
          margin="0"
          onClick={() => data.action?.onClick()}
          disabled={data.action?.disabled}
        >
          {data.action.label}
        </Button>
      )}
    </Box>
  );
}
