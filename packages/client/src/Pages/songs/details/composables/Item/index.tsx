import { memo, useMemo } from 'react';

import { BaseModel } from '../../../../../Types';
import { ItemProps } from './types';

// Composables
import Items from './composables/Items';

const Item = <T extends BaseModel>({ label, type, ...props }: ItemProps<T>) => {
  const ItemComponent = useMemo(() => Items[type], [type]);

  return (
    <div>
      <span className="font-semibold text-lg whitespace-nowrap">{label}: </span>
      {<ItemComponent {...props} />}
    </div>
  );
};

export default memo(Item);
