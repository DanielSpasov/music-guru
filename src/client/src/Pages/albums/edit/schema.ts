import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { Input, Select } from '../../../Components';
import Api from '../../../Api';

export const schema: FormSchema = [
  {
    title: 'Details',
    key: 'details',
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
        key: 'songs',
        label: 'Songs',
        Component: Select,
        props: {
          fetchFn: ({ params }) => Api.songs.fetch({ config: { params } }),
          multiple: true
        },
        validations: {
          required: true
        }
      }
    ]
  }
];
