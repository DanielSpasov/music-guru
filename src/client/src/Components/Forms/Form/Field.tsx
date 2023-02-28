import { Box, Text } from '../../HTML';
import Section from '../Section';
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
      {field?.type !== 'section' && (
        <Box display="flex" justifyContent="flex-end">
          <Text
            variant={field?.required ? 'danger' : undefined}
            color={!field?.required ? 'gray' : undefined}
          >
            {field?.required ? '*' : 'Optional'}
          </Text>
        </Box>
      )}

      {field?.type === 'section' ? (
        <Section
          register={register}
          getValues={getValues}
          setFormValue={setValue}
          name={field.key}
          {...field}
        />
      ) : (
        <field.Component
          register={register}
          getValues={getValues}
          setFormValue={setValue}
          name={field.key}
          {...field}
        />
      )}

      {error && field?.type !== 'section' && (
        <Text variant="danger">{error?.message}</Text>
      )}
    </Box>
  );
}
