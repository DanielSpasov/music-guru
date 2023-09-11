import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { Input, Select, Calendar } from '../../../Components';
import Api from '../../../Api';

export const schema: FormSchema = [
  {
    key: 'fields',
    fields: [
      {
        key: 'name',
        label: 'Name',
        Component: Input,
        props: {
          type: 'text'
        },
        validations: {
          required: true
        }
      },
      {
        key: 'image',
        label: 'Image URL',
        Component: Input,
        props: {
          type: 'text'
        }
      },
      {
        key: 'release_date',
        label: 'Release Date',
        Component: Calendar
      },
      {
        key: 'artist',
        label: 'Artist',
        Component: Select,
        props: {
          fetchFn: ({ params }: any) =>
            Api.artists.fetch({ config: { params } })
        },
        validations: {
          required: true
        }
      },
      {
        key: 'features',
        label: 'Featured Artists',
        Component: Select,
        props: {
          fetchFn: ({ params }: any) =>
            Api.artists.fetch({ config: { params } }),
          multiple: true,
          type: 'text'
        }
      }
    ]
  }
];
