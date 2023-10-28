import { useController } from 'react-hook-form';

import { FieldProps } from './helpers';

export default function Field({
  field,
  control,
  setValue,
  validateField
}: FieldProps) {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    name: field.key,
    control,
    rules: { ...field?.validations }
  });

  return (
    <div className="my-2">
      <div className="text-end">
        <span
          className={
            field?.validations?.required ? 'text-red-400' : 'text-neutral-500'
          }
        >
          {field?.validations?.required ? '*' : 'Optional'}
        </span>
      </div>

      <field.Component
        value={value}
        setValue={setValue}
        validateField={validateField}
        onChange={onChange}
        name={field.key}
        label={field.label}
        props={field?.props}
      />

      {error && <span className="text-red-400">{error?.message}</span>}
    </div>
  );
}
