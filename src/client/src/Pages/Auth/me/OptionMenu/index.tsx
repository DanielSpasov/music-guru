import { Box, Icon, Summary } from '../../../../Components';
import { OptionMenuProps } from './helpers';
import Option from './Option';

export default function OptionMenu({
  icon,
  label,
  config,
  setUser,
  user
}: OptionMenuProps) {
  return (
    <Box display="flex" alignItems="flex-start" margin=".5em 0">
      <Icon model={icon} variant="primary" size="60px" />
      <Summary label={label} open>
        {config.map((data, i) => (
          <Option data={data} key={i} setUser={setUser} user={user} />
        ))}
      </Summary>
    </Box>
  );
}
