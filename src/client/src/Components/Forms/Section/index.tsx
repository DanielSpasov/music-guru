import { memo, useCallback, useReducer } from 'react';

import { ActionKind, SectionProps, sectionReducer } from './helpers';
import { Box, Icon, Text } from '../../HTML';
import Field from '../Form/Field';

function Section({
  label,
  name,
  Component,
  fetchFn,
  required,
  register,
  getValues,
  setFormValue
}: SectionProps) {
  const [fields, dispatch] = useReducer(sectionReducer, [
    { label, key: name, Component, fetchFn, required }
  ]);

  const add = useCallback(() => {
    dispatch({ type: ActionKind.ADD });
  }, []);

  const remove = useCallback(() => {
    dispatch({ type: ActionKind.REMOVE });
  }, []);

  return (
    <Box>
      <Text textAlign="start" fontSize="1.2em">
        {label}s
      </Text>

      <Box>
        {fields.map(field => (
          <Box key={field.key}>
            <Box width="calc(100% - 30px)">
              <Field
                field={field}
                register={register}
                getValues={getValues}
                setValue={setFormValue}
              />
            </Box>
            <Icon
              model="minus"
              type="solid"
              onClick={remove}
              position="absolute"
              fontSize="1.3em"
              right=".2rem"
              top="2rem"
            />
          </Box>
        ))}
      </Box>

      <Icon
        onClick={add}
        model="plus"
        type="solid"
        position="absolute"
        right="0"
        top="0"
      />
    </Box>
  );
}

export default memo(Section);
