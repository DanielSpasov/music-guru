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
          variant={field?.required ? 'danger' : undefined}
          color={!field?.required ? 'gray' : undefined}
        >
          {field?.required ? '*' : 'Optional'}
        </Text>
      </Box>

      <field.Component
        name={field.key}
        type={field?.type}
        label={field.label}
        register={register}
        getValues={getValues}
        setFormValue={setValue}
        fetchFn={field?.fetchFn}
        multiple={field?.multiple}
      />

      {error && <Text variant="danger">{error?.message}</Text>}
    </Box>
  );
}
