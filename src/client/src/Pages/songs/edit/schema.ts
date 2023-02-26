import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { Input, Select, Calendar } from '../../../Components';
import Api from '../../../Api';

export const schema: FormSchema = {
  fields: [
    {
      key: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      Component: Input
    },
    {
      key: 'image',
      type: 'text',
      label: 'Image URL',
      required: true,
      Component: Input
    },
    {
      key: 'release_date',
      label: 'Release Date',
      required: false,
      Component: Calendar
    },
    {
      key: 'artist',
      label: 'Artist',
      fetchFn: ({ params }: any) => Api.artists.fetch({ config: { params } }),
      required: true,
      Component: Select
    },
    {
      key: 'features',
      label: 'Featured Artists',
      fetchFn: ({ params }: any) => Api.artists.fetch({ config: { params } }),
      Component: Select,
      multiple: true,
      required: false
    }
  ]
};
