import { ActionProps } from './helpers';
import { Box, Icon } from '../../HTML';

export default function Action({ action }: ActionProps) {
  return (
    <Box height="100%" margin="0 0.75em" display="flex" alignItems="center">
      <Icon
        model={action.icon.model}
        type={action.icon.type}
        {...(!action?.disabled && { onClick: action.perform })}
        color={action.disabled && 'gray'}
        fontSize="1.5em"
      />
    </Box>
  );
}
