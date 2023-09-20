import styled from 'styled-components';

import { IconModel } from '../../HTML/Icon/Icons';
import { Box, Icon, Text } from '../../HTML';

type ControlsProps = {
  onClear: (props: any) => void;
  onClick: (props: any) => void;
  iconModel: IconModel;
  value: any;
};

export default function Controls({
  iconModel,
  onClick,
  onClear,
  value
}: ControlsProps) {
  return (
    <WrapperBox>
      <IconBox>
        {value && <Icon model="close" size="20px" onClick={onClear} />}
      </IconBox>
      <Separator />
      <IconBox>
        <Icon model={iconModel} size="20px" onClick={onClick} />
      </IconBox>
    </WrapperBox>
  );
}

const Separator = styled(Text)`
  background-color: ${({ theme: { colors } }) => colors.baseLightest};
  align-self: stretch;
  margin-bottom: 8px;
  margin-top: 8px;
  width: 1px;
`;

const IconBox = styled(Box)`
  display: flex;
  padding: 8px;
`;

const WrapperBox = styled(Box)`
  align-items: center;
  align-self: stretch;
  position: absolute;
  flex-shrink: 0;
  display: flex;
  height: 100%;
  padding: 2px;
  right: 0;
  top: 0;
`;
