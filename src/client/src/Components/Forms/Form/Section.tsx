import { Box, Heading } from '../../HTML';
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
    <Box margin=".75em 0">
      {title && (
        <Heading title={title} textAlign="start" size="small" margin="0" />
      )}

      <Box>
        {fields.map(field => (
          <Field
            key={field.key}
            control={control}
            validateField={validateField}
            field={field}
            setValue={setValue}
          />
        ))}
      </Box>
    </Box>
  );
}
