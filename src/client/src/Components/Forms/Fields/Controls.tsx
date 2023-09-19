import styled from 'styled-components';
import { Box, Icon, Text } from '../../HTML';

type ControlsProps = {
  customIcon: JSX.Element;
  onChange: (props: any) => void;
  value: any;
};

export default function Controls({
  customIcon,
  onChange,
  value
}: ControlsProps) {
  return (
    <WrapperBox>
      <IconBox>
        {value && (
          <Icon model="close" size="20px" onClick={() => onChange(undefined)} />
        )}
      </IconBox>
      <Separator />
      <IconBox>{customIcon}</IconBox>
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
