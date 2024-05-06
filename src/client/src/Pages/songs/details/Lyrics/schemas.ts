import { Input, Textarea } from '../../../../Components';
import { VerseSchema } from '../../../../Validations/Song';
import { VerseFormSchema } from './helpers';

export const createVerseSchema: VerseFormSchema = {
  validationSchema: VerseSchema,
  schema: [
    {
      key: 'verse',
      foldable: false,
      fields: [
        {
          key: 'title',
          label: 'Title',
          Component: Input,
          validations: {
            required: {
              value: true,
              message: 'Title is required.'
            }
          }
        },
        {
          key: 'lyrics',
          label: 'Lyrics',
          Component: Textarea,
          validations: {
            required: {
              value: true,
              message: 'Lyrics are required.'
            }
          }
        }
      ]
    }
  ]
};

export const editVerseSchema: VerseFormSchema = {
  validationSchema: VerseSchema,
  schema: [
    {
      key: 'verse',
      foldable: false,
      fields: [
        {
          key: 'title',
          label: 'Title',
          Component: Input,
          validations: {
            required: {
              value: true,
              message: 'Title is required.'
            }
          }
        },
        {
          key: 'lyrics',
          label: 'Lyrics',
          Component: Textarea,
          validations: {
            required: {
              value: true,
              message: 'Lyrics are required.'
            }
          }
        }
      ]
    }
  ]
};
