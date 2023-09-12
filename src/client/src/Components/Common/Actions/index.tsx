import { ActionsProps } from './helpers';
import SubAction from './SubAction';
import Dropdown from '../Dropdown';
import { Box } from '../../HTML';
import Action from './Action';

export default function Actions({ actions }: ActionsProps) {
  return (
    <Box position="relative" display="flex" alignItems="center" height="100%">
      {actions.map((action, i) => {
        switch (action.type) {
          case 'menu':
            return (
              <Dropdown
                key={i}
                icon={action.icon}
                label="Actions"
                disabled={action?.disabled}
              >
                {action?.subActions?.map((action, i) => (
                  <SubAction key={i} action={action} />
                ))}
              </Dropdown>
            );
          default:
            return <Action key={i} action={action} />;
        }
      })}
    </Box>
  );
}
