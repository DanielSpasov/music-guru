import { ChangeEvent, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { fromatDate } from '../../../Utils';
import { Icon } from '../../../Components';
import { OptionProps } from './helpers';
import Api from '../../../Api';

const hoverProps = 'hover:border-neutral-300';
const focusProps =
  'focus:border-primary dark:focus:border-primary-dark [&~label]:focus:-top-7 [&~label]:focus:left-1';
const darkProps =
  'dark:bg-neutral-800 dark:border-neutral-600 dark:hover:border-neutral-500';

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
      setUser(prev => {
        console.log({ ...prev, ...updated }, updated);
        return { ...prev, ...updated };
      });
      toast.success(`${data.label} updated successfully.`);
    } catch (error) {
      errorHandler(error);
    }
  }, [uid, data, value, setUser]);

  return (
    <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-md p-3 m-1">
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
              className="w-6 h-6"
              onClick={() => setIsEditing(prev => !prev)}
            />
          ))}
      </div>

      <div className="flex-1">
        <span className="font-bold">{data.label}:</span>
      </div>

      <div className="flex-1">
        {isEditing ? (
          <input
            value={value as string}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e?.target?.value)
            }
            className={`w-full h-11 rounded-md bg-neutral-100 border-2 border-neutral-200 p-2 outline-none ${darkProps} ${focusProps} ${hoverProps}`}
          />
        ) : (
          <>
            {data.type === 'string' && (
              <span>{user[data.field]?.toString()}</span>
            )}
            {data.type === 'boolean' && (
              <Icon
                model={user[data.field] ? 'check' : 'close'}
                className={
                  user[data.field]
                    ? '[&>path]:text-green-500'
                    : '[&>path]:text-red-400'
                }
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
            className="py-1.5 p-3"
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
