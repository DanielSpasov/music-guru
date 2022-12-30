import { useNavigate } from 'react-router-dom';
import { Action } from '../../../Types';

import { Box, Button, Icon } from '../../HTML';

export default function BreadCrumb({ actions }: { actions: Action[] }) {
  const navigate = useNavigate();

  console.log(actions);

  return (
    <Box
      width="100%"
      height="50px"
      position="relative"
      boxShadow="rgba(0, 0, 0, 0.45) 0px 5px 15px"
      zIndex="9998"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <Box>
          <Icon
            model="arrow-left"
            type="solid"
            padding="8px"
            onClick={() => navigate(-1)}
          />
          <Icon
            model="home"
            type="solid"
            padding="8px"
            fontSize="1.5em"
            onClick={() => navigate('/')}
          />
        </Box>
        <Box position="relative">
          {actions.map((action: Action) => (
            <Button
              disabled={action.disabled}
              onClick={action?.perform}
              variant="secondary"
              margin="0 .3em"
              padding=".5em"
            >
              {action?.icon && (
                <Icon
                  model={action.icon.model}
                  type={action.icon.type}
                  font-size="1em"
                />
              )}
              {action?.label}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
