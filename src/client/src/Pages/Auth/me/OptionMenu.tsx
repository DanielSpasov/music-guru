import { useCallback, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';

import { MenuOption, MenuOptionAction, OptionMenuProps } from './helpers';
import { Box, Button, Icon, Summary, Text } from '../../../Components';
import { toast } from 'react-toastify';

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

  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(async (action: MenuOptionAction) => {
    try {
      setLoading(true);
      const res = await action.onClick();
      toast.success(res?.message || 'Action successful.');
    } catch (error) {
      toast.error(
        'An error occurred when trying to send the verification email.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

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
          padding=".6em"
          onClick={() => data?.action && handleClick(data.action)}
          disabled={loading || data.action?.disabled}
        >
          {data.action.label}
        </Button>
      )}
    </Box>
  );
}
