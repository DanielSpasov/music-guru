import { Box, Text } from '../../HTML';
import { SubActionProps } from './helpers';

export default function SubAction({ action }: SubActionProps) {
  return (
    <Box height="100%" padding="0.25em">
      <Text
        fontSize="1.25em"
        onClick={!action?.disabled ? action.perform : null}
        color={action?.disabled ? 'gray' : null}
      >
        {action.label}
      </Text>
    </Box>
  );
}
