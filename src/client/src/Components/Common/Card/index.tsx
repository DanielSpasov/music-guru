import { memo, useMemo } from 'react';

import { CardSwitchProps, cards } from './helpers';
import { BaseModel } from '../../../Types';

const Card = <T extends BaseModel>({ model, ...props }: CardSwitchProps<T>) => {
  const Component = useMemo(() => cards[model], [model]);
  return Component ? (
    <Component {...props} />
  ) : (
    <div data-testid="card-not-found">Card not found.</div>
  );
};

export default memo(Card) as typeof Card;
