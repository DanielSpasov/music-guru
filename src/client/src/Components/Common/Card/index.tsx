import { FC, memo, useMemo } from 'react';

import { CardSwitchProps, cards } from './helpers';

const Card: FC<CardSwitchProps> = ({ model, ...props }) => {
  const Component = useMemo(() => cards[model], [model]);
  return Component ? (
    <Component {...props} />
  ) : (
    <div data-testid="card-not-found">Card not found.</div>
  );
};

export default memo(Card);
