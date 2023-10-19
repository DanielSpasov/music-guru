import { useController } from 'react-hook-form';
import { Box, Text } from '../../HTML';
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
    <Box position="relative" margin=".5em 0" key={field.key}>
      <Box display="flex" justifyContent="flex-end">
        <Text
          variant={field?.validations?.required ? 'danger' : undefined}
          color={!field?.validations?.required ? 'gray' : undefined}
        >
          {field?.validations?.required ? '*' : 'Optional'}
        </Text>
      </Box>

      <Box>
        <field.Component
          value={value}
          setValue={setValue}
          validateField={validateField}
          onChange={onChange}
          name={field.key}
          label={field.label}
          props={field?.props}
        />
      </Box>

      {error && <Text variant="danger">{error?.message}</Text>}
    </Box>
  );
}
