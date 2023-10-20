import { SectionProps } from './helpers';
import Field from '../Form/Field';

export default function Section({
  title,
  fields,
  control,
  setValue,
  validateField
}: SectionProps) {
  return (
    <section>
      <h1 className="font-bold">{title}</h1>

      <div>
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
