import { ActionProps } from './helpers';
import { Box, Icon } from '../../HTML';

export default function Action({ action }: ActionProps) {
  return (
    <Box height="100%" margin="0 0.75em" display="flex" alignItems="center">
      <Icon
        model={action.icon.model}
        type={action.icon.type}
        onClick={!action.disabled ? action.perform : null}
        color={action.disabled ? 'gray' : null}
        fontSize="1.5em"
      />
    </Box>
  );
}
