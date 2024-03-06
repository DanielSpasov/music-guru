import Api from '../../../Api';
import { Input, Textarea } from '../../../Components';
import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { EditArtistSchema } from '../helpers';

export const schema: FormSchema = {
  title: 'Edit Artist',
  header: 'Edit Artist',
  validationSchema: EditArtistSchema,
  fetchDefaultData: async ({ toast, params: { id = '' } }) => {
    try {
      const { data } = await Api.artists.get({
        id,
        config: { params: { serializer: 'detailed' } }
      });
      return data;
    } catch (err) {
      toast.error('Failed to fetch default data');
      return {};
    }
  },
  onSubmit: async ({ formData, toast, navigate, params: { id = '' } }) => {
    try {
      const { data } = await Api.artists.patch({ id, body: formData });
      toast.success('Successfully Edited Artist');
      navigate(`/artists/${data.uid}`);
    } catch (err) {
      toast.error('Failed to Edit Artist');
    }
  },
  sections: [
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
          key: 'bio',
          label: 'Biography',
          Component: Textarea
        }
      ]
    }
  ]
};
