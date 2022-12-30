import { useNavigate } from 'react-router-dom';

import { Box, Icon } from '../../HTML';

export default function BreadCrumb() {
  const navigate = useNavigate();

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
      </Box>
    </Box>
  );
}
