import { FC, useState } from 'react';

import { FieldsetProps } from './helpers';
import { Icon } from '../../Common';

const Fieldset: FC<FieldsetProps> = ({
  title,
  foldable = false,
  children,
  ...props
}) => {
  const [hidden, setHidden] = useState(false);

  return (
    <fieldset {...props}>
      <p className="font-semibold">
        {title}
        {foldable && (
          <Icon
            model={hidden ? 'up' : 'down'}
            onClick={() => setHidden(prev => !prev)}
            className="inline w-8 h-8"
          />
        )}
      </p>

      {!hidden && children}
    </fieldset>
  );
};

export default Fieldset;
