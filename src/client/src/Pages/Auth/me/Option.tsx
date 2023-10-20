import { ChangeEvent, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { StyledInput } from '../../../Components/Forms/Fields/Input/Styled';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { fromatDate } from '../../../Utils';
import { Icon } from '../../../Components';
import { OptionProps } from './helpers';
import Api from '../../../Api';

export default function Option({ data, user, setUser }: OptionProps) {
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
    <div className="flex items-center bg-neutral-800 rounded-md p-3 m-1">
      <div className="w-10">
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
            <Icon
              model="edit"
              size="1.5em"
              onClick={() => setIsEditing(prev => !prev)}
            />
          ))}
      </div>

      <div className="flex-1">
        <span className="font-bold">{data.label}:</span>
      </div>

      <div className="flex-1">
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
            {data.type === 'string' && <span>{user[data.field]}</span>}
            {data.type === 'boolean' && (
              <Icon
                model={user[data.field] ? 'check' : 'close'}
                variant={user[data.field] ? 'success' : 'danger'}
              />
            )}
            {data.type === 'date' && (
              <span>
                {fromatDate({ date: user[data.field] as any as Date })}
              </span>
            )}
          </>
        )}
      </div>

      <div className="flex flex-1 justify-end">
        {data?.action && !data?.action?.hide && (
          <button
            className="bg-primary rounded-md p-1.5 font-bold"
            onClick={handleOnClick}
            disabled={loading || data.action?.disabled}
          >
            {data.action?.label}
          </button>
        )}
      </div>
    </div>
  );
}
