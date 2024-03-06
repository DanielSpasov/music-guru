import Api from '../../../Api';
import { Input, Textarea } from '../../../Components';
import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { ArtistSchema } from '../helpers';

export const schema: FormSchema = {
  title: 'Create Artist',
  header: 'Create Artist',
  validationSchema: ArtistSchema,
  onSubmit: async ({ formData, toast, navigate }) => {
    try {
      const res = await Api.artists.post({
        body: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      });
      toast.success(`Successfully created artist: ${res.name}`);
      navigate(`/artists/${res.uid}`);
    } catch (err) {
      toast.error('Failed to create artist.');
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
        },
        {
          key: 'image',
          label: 'Image',
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
        }
      ]
    }
  ]
};
