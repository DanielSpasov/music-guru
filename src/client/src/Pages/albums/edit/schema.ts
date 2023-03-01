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
        key: 'artist',
        label: 'Artist',
        fetchFn: ({ params }: any) => Api.artists.fetch({ config: { params } }),
        Component: Select,
        required: true
      }
    ]
  }
];
