import { ActionsProps } from './helpers';
import { Box } from '../../HTML';
import Action from './Action';

export default function Actions({ actions }: ActionsProps) {
  return (
    <Box position="relative" display="flex" alignItems="center" height="100%">
      {actions.map((action, i) => (
        <Action key={i} action={action} />
      ))}
    </Box>
  );
}
