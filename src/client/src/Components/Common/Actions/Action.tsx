import { ActionProps } from './helpers';
import { Box, Icon } from '../../HTML';

export default function Action({ action }: ActionProps) {
  return (
    <Box height="100%" margin="0 0.5em" display="flex" alignItems="center">
      <Icon
        onClick={!action.disabled ? action.perform : null}
        disabled={action.disabled}
        model={action.icon}
      />
    </Box>
  );
}
