import { ThemeContext } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { Action } from '../../../Types';
import { Box, Icon } from '../../HTML';

export default function BreadCrumb({ actions }: { actions: Action[] }) {
  const { colors } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Box
      width="100%"
      height="50px"
      position="relative"
      backgroundColor={colors.base}
      boxShadow="rgba(0, 0, 0, 0.45) 0px 3px 4px"
      zIndex="9998"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <Box display="flex">
          <Icon
            model="arrow-left"
            type="solid"
            padding="8px"
            fontSize="1.5em"
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
        <Box position="relative" display="flex" flex-direction="row-reverse">
          {actions.map((action: Action, i: number) => (
            <Icon
              key={i}
              model={action.icon.model}
              type={action.icon.type}
              onClick={action.perform}
              disabled={action.disabled}
              fontSize="1.5em"
              padding="8px"
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
