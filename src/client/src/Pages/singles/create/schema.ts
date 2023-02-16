import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { Input } from '../../../Components';
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
      key: 'artist',
      type: 'select',
      label: 'Artist',
      fetchFn: ({ params }: any) => Api.artists.fetch({ config: { params } }),
      required: true,
      Component: Input
    }
  ]
};
