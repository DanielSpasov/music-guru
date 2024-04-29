import { useState } from 'react';

import { SectionProps } from './helpers';
import { Icon } from '../../Common';
import Field from '../Form/Field';

export default function Section({
  title,
  fields,
  control,
  foldable = true,
  setValue,
  validateField
}: SectionProps) {
  const [open, setOpen] = useState(true);

  return (
    <section>
      <div className="flex items-center">
        {foldable ? (
          <Icon
            model={open ? 'up' : 'down'}
            className="mr-2"
            onClick={() => setOpen(prev => !prev)}
          />
        ) : null}
        <h4>
          {title}{' '}
          {!open && (
            <span className="text-neutral-500 font-semibold">
              [{fields.length} fields]
            </span>
          )}
        </h4>
      </div>
      <div className={`${open ? 'visible' : 'hidden'}`}>
        {fields.map(field => (
          <Field
            key={field.key}
            control={control}
            validateField={validateField}
            field={field}
            setValue={setValue}
          />
        ))}
      </div>
    </section>
  );
}
