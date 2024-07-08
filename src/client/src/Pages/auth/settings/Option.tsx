import { toast } from 'react-toastify';
import moment from 'moment';
import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useContext,
  useState
} from 'react';

import { Button, ICheck, IPen, IX } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { labelProps, themeProps } from './styles';
import { OptionProps } from './types';
import Api from '../../../Api';

const Option: FC<OptionProps> = ({ data, user, setUser }) => {
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
      toast.error('Failed to perform action.');
    } finally {
      setLoading(false);
    }
  }, [data?.action]);

  const onSubmit = useCallback(async () => {
    try {
      const { data: updated } = await Api.users.patch({
        id: uid || '',
        field: data.field,
        body: { [data.field]: value }
      });
      setUser(prev => ({ ...prev, ...updated }));
      toast.success(`${data.label} updated successfully.`);
    } catch (error) {
      toast.error(`Failed to update ${data.field}.`);
    }
  }, [uid, data, value, setUser]);

  return (
    <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-md p-3 m-1">
      <div className="w-10">
        {data?.editable &&
          (isEditing ? (
            <ICheck
              onClick={() => {
                setIsEditing(prev => !prev);
                onSubmit();
              }}
            />
          ) : (
            <IPen
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
            className={`w-full h-11 rounded-md border-2 p-2 outline-none ${themeProps} ${labelProps}`}
          />
        ) : (
          <>
            {data.type === 'string' && (
              <span>{user[data.field]?.toString()}</span>
            )}

            {data.type === 'boolean' &&
              (user[data.field] ? (
                <ICheck color="[&>path]:fill-green-500" />
              ) : (
                <IX color="[&>path]:fill-red-400" />
              ))}

            {data.type === 'date' && (
              <span>{moment(user[data.field] as Date).format('LLLL')}</span>
            )}
          </>
        )}
      </div>

      <div className="flex flex-1 justify-end">
        {data?.action && !data?.action?.hide && (
          <Button
            onClick={handleOnClick}
            disabled={loading || data.action?.disabled}
          >
            {data.action?.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(Option);
