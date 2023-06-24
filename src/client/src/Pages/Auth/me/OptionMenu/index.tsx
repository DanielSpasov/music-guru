import { ThemeContext } from 'styled-components';
import { useContext } from 'react';

import { Box, Icon, Summary } from '../../../../Components';
import { OptionMenuProps } from './helpers';
import Option from './Option';

export default function OptionMenu({
  icon,
  label,
  config,
  setUser
}: OptionMenuProps) {
  const { colors } = useContext(ThemeContext);

  return (
    <Box display="flex" alignItems="flex-start" margin=".5em 0">
      <Icon {...icon} color={colors.primary} fontSize="2em" padding=".4em" />
      <Summary label={label} open>
        {config.map((data, i) => (
          <Option data={data} key={i} setUser={setUser} />
        ))}
      </Summary>
    </Box>
  );
}
