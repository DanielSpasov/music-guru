import { memo, useMemo } from 'react';
import moment from 'moment';

import { BaseModel } from '../../../../../Types';
import { ICheck, IX } from '../../../..';
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
          <div className="flex">
            {actions?.map((action, i) => (
              <action.Icon key={i} onClick={() => action.onClick(item.uid)} />
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

  if (loading) return <td className="h-11 p-2" />;
  return <td className="p-2">{Data}</td>;
};

export default memo(Data) as typeof Data;
