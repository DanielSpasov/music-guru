import { memo, useMemo } from 'react';
import moment from 'moment';

import { BaseModel } from '../../../../../Types';
import { Button, ICheck, IX } from '../../../..';
import { DataProps } from './types';

const Data = <T extends BaseModel>({
  col,
  item,
  loading,
  actions
}: DataProps<T>) => {
  const Data = useMemo(() => {
    switch (col.type) {
      case 'actions':
        return (
          <div className="flex gap-1">
            {actions?.map((action, i) => (
              <Button
                disabled={Boolean(action?.disableFn?.(item))}
                onClick={() => action.onClick(item.uid)}
                variant="outline"
                key={i}
              >
                <action.Icon className="w-6 h-6" key={i} />
                {action?.label}
              </Button>
            ))}
          </div>
        );

      case 'boolean':
        return item[col.key] ? (
          <ICheck className="w-7 h-7" color="[&>path]:fill-green-400" />
        ) : (
          <IX className="w-7 h-7" color="[&>path]:fill-red-400" />
        );

      case 'date':
        return moment(item[col.key]?.toString()).format('ddd MMM DD YYYY');

      default:
        return item[col.key]?.toString();
    }
  }, [col, item, actions]);

  return (
    <td className={`p-2 ${loading ? 'opacity-50' : 'opacity-100'}`}>{Data}</td>
  );
};

export default memo(Data) as typeof Data;
