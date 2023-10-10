import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { Input, Select } from '../../../Components';
import Api from '../../../Api';

export const schema: FormSchema = [
  {
    key: 'details',
    title: 'Details',
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
          type: 'file',
          accept: ['image/jpeg', 'image/png']
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
          fetchFn: ({ params }) => Api.artists.fetch({ config: { params } })
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
