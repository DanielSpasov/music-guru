import { ThemeContext } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { Action } from '../../Common/Actions/helpers';
import { Box, Icon } from '../../HTML';
import { Actions } from '../../Common';

export default function BreadCrumb({ actions }: { actions: Action[] }) {
  const { colors } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Box
      width="100%"
      height="60px"
      position="relative"
      backgroundColor={colors.base}
      boxShadow="rgba(0, 0, 0, 0.45) 0px 3px 4px"
      borderRadius="0"
      zIndex="9998"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <Box display="flex">
          <Icon onClick={() => navigate(-1)} model="back" />
          <Icon onClick={() => navigate('/')} model="home" />
        </Box>
        <Actions actions={actions} />
      </Box>
    </Box>
  );
}
