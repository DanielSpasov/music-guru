import { FormSection } from '../../../../../Components/Forms/Form/helpers';
import { Input, Textarea } from '../../../../../Components';

export const newVerseSchema: FormSection[] = [
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
];

export const editVerseSchema: FormSection[] = [
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
];

export const wrapperLightProps = 'border-neutral-200 border-[1px]';
export const wrapperDarkProps = 'dark:border-none dark:bg-neutral-900';
export const wrapperProps = `${wrapperLightProps} ${wrapperDarkProps}`;
