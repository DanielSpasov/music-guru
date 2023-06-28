import { Box, Text } from '../../HTML';
import { FieldProps } from './helpers';

export default function Field({
  field,
  register,
  error,
  getValues,
  setValue
}: FieldProps) {
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
          register={register}
          getValues={getValues}
          setFormValue={setValue}
          name={field.key}
          {...field}
        />
      </Box>

      {error && <Text variant="danger">{error?.message}</Text>}
    </Box>
  );
}
