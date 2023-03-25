import { Box, Heading } from '../../HTML';
import { SectionProps } from './helpers';
import Field from '../Form/Field';

export default function Section({
  title,
  fields,
  register,
  setFormValue,
  getValues,
  errors
}: SectionProps) {
  return (
    <Box margin=".75em 0">
      {title && (
        <Heading title={title} textAlign="start" size="small" margin="0" />
      )}

      <Box>
        {fields.map(field => (
          <Field
            key={field.key}
            field={field}
            error={errors.find(x => x.path.includes(field.key))}
            register={register}
            getValues={getValues}
            setValue={setFormValue}
          />
        ))}
      </Box>
    </Box>
  );
}
