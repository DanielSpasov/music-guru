import { ChangeEvent, useCallback, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { toast } from 'react-toastify';

import { StyledInput } from '../../../../Components/Forms/Fields/Input/Styled';
import { Box, Button, Icon, Text } from '../../../../Components';
import { AuthContext } from '../../../../Contexts/Auth';
import { errorHandler } from '../../../../Handlers';
import { fromatDate } from '../../../../Utils';
import { OptionProps } from './helpers';
import Api from '../../../../Api';

export default function Option({ data, user, setUser }: OptionProps) {
  const { colors } = useContext(ThemeContext);
  const { uid } = useContext(AuthContext);

  const [value, setValue] = useState(user[data.field]);
  const [isEditing, setIsEditing] = useState(false);
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

  const onSubmit = useCallback(async () => {
    try {
      const { data: updated } = await Api.user.patch({
        id: uid || '',
        field: data.field,
        body: { [data.field]: value }
      });
      setUser(updated);
      toast.success(`${data.label} updated successfully.`);
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
              onClick={() => {
                setIsEditing(prev => !prev);
                onSubmit();
              }}
            />
          ) : (
            <Icon model="edit" onClick={() => setIsEditing(prev => !prev)} />
          ))}
      </Box>

      <Box flex="1">
        <Text fontWeight="bold">{data.label}: </Text>
      </Box>

      <Box flex="2">
        {isEditing ? (
          <StyledInput
            margin="0"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e?.target?.value)
            }
          />
        ) : (
          <>
            {data.type === 'string' && <Text>{user[data.field]}</Text>}
            {data.type === 'boolean' && (
              <Icon
                model={user[data.field] ? 'check' : 'close'}
                variant={user[data.field] ? 'success' : 'danger'}
              />
            )}
            {data.type === 'date' && (
              <Text>
                {fromatDate({ date: user[data.field] as any as Date })}
              </Text>
            )}
          </>
        )}
      </Box>

      <Box flex="2" textAlign="end">
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
