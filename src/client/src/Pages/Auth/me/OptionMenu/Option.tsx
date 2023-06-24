import {
  ChangeEvent,
  Dispatch,
  useCallback,
  useContext,
  useState
} from 'react';
import { ThemeContext } from 'styled-components';
import { toast } from 'react-toastify';

import { StyledInput } from '../../../../Components/Forms/Fields/Input/Styled';
import { Box, Button, Icon, Text } from '../../../../Components';
import { MenuOption } from './helpers';
import { AuthContext } from '../../../../Contexts/Auth';
import Api from '../../../../Api';
import { errorHandler } from '../../../../Handlers';
import { User } from '../../helpers';

export default function Option({
  data,
  setUser
}: {
  data: MenuOption;
  setUser: Dispatch<User>;
}) {
  const { colors } = useContext(ThemeContext);
  const { uid } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(data?.value);
  const [loading, setLoading] = useState(false);

  const handleOnClick = useCallback(async () => {
    try {
      setLoading(true);
      const res = await data?.action?.onClick();
      toast.success(res?.message || 'Action successful.');
    } catch (error) {
      toast.error(
        'An error occurred when trying to send the verification email.'
      );
    } finally {
      setLoading(false);
    }
  }, [data?.action]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e?.target?.value),
    []
  );

  const onSubmit = useCallback(async () => {
    try {
      const { data: updated } = await Api.user.patch({
        id: uid || '',
        field: data.field,
        body: { [data.field]: value }
      });
      setUser(updated);
      toast.success(`${data.name} updated successfully.`);
    } catch (error) {
      errorHandler(error);
    }
  }, [uid, data, value, setUser]);

  return (
    <Box
      backgroundColor={colors.base}
      padding="1em"
      margin=".5em"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box width="2.5em">
        {data?.editable &&
          (isEditing ? (
            <Icon
              model="check"
              type="solid"
              onClick={() => {
                setIsEditing(prev => !prev);
                onSubmit();
              }}
            />
          ) : (
            <Icon
              model="edit"
              type="solid"
              onClick={() => setIsEditing(prev => !prev)}
            />
          ))}
      </Box>

      <Box flex="3">
        <Text fontWeight="bold">{data.name}: </Text>
      </Box>

      <Box flex="3">
        {isEditing ? (
          <StyledInput margin="0" value={value} onChange={onChange} />
        ) : (
          <>
            {data?.type === 'boolean' ? (
              <Icon
                model={data?.value ? 'check' : 'x'}
                type="solid"
                color={data?.value ? colors.success : colors.danger}
                padding="0 .5em"
              />
            ) : (
              <Text>{data?.value}</Text>
            )}
          </>
        )}
      </Box>

      <Box flex="3" textAlign="end">
        {data?.action && !data?.action?.hide && (
          <Button
            margin="0"
            padding=".6em"
            onClick={handleOnClick}
            disabled={loading || data.action?.disabled}
          >
            {data.action.label}
          </Button>
        )}
      </Box>
    </Box>
  );
}
