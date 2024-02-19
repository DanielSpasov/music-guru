import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { DatePicker, Input, Select } from '../../../Components';
import { Config } from '../../../Api/helpers';
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
          required: {
            value: true,
            message: 'Name is required.'
          }
        }
      },
      {
        key: 'type',
        label: 'Type',
        Component: Select,
        props: {
          fetchFn: () => Api.albums.fetchTypes({}),
          getOptionValue: (opt: { code: string }) => opt.code
        },
        validations: {
          required: {
            value: true,
            message: 'Type is required.'
          }
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
          required: {
            value: true,
            message: 'Image is required.'
          }
        }
      },
      {
        key: 'artist',
        label: 'Artist',
        Component: Select,
        props: {
          fetchFn: ({ params }: Config) =>
            Api.artists.fetch({ config: { params } })
        },
        validations: {
          required: {
            value: true,
            message: 'Artist is required.'
          }
        }
      },
      {
        key: 'release_date',
        label: 'Release Date',
        Component: DatePicker
      },
      {
        key: 'songs',
        label: 'Songs',
        Component: Select,
        props: {
          fetchFn: ({ params }: Config) =>
            Api.songs.fetch({ config: { params } }),
          multiple: true
        }
      }
    ]
  }
];
