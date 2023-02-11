import { Box, Text } from '../../HTML';
import { SubActionProps } from './helpers';

export default function SubAction({ action }: SubActionProps) {
  return (
    <Box height="100%" padding="0.25em">
      <Text
        fontSize="1.25em"
        {...(!action?.disabled && { onClick: action.perform })}
        color={action?.disabled && 'gray'}
      >
        {action.label}
      </Text>
    </Box>
  );
}
