import { FC, useState } from 'react';

import { FieldsetProps } from './helpers';
import { IDown, IUp } from '../../Icons';

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
        {foldable &&
          (hidden ? (
            <IDown
              onClick={() => setHidden(false)}
              className="inline w-8 h-8"
            />
          ) : (
            <IUp onClick={() => setHidden(true)} className="inline w-8 h-8" />
          ))}
      </p>

      {!hidden && children}
    </fieldset>
  );
};

export default Fieldset;
