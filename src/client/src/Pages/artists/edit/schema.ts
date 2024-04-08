import { EditArtistSchema, SocialsSchema } from '../../../Validations';
import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { Input, Textarea } from '../../../Components';
import Api from '../../../Api';

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

      return {
        ...data,
        ...data.links.reduce(
          (acc, { name, url }) => ({ ...acc, [name]: url }),
          {}
        )
      };
    } catch (err) {
      toast.error('Failed to fetch default data');
      return {};
    }
  },
  onSubmit: async ({ formData, toast, navigate, params: { id = '' } }) => {
    try {
      const socialsKeys = Object.keys(SocialsSchema.shape);

      const payload = Object.entries(formData).reduce((data, [key, value]) => {
        if (!value) return data;

        if (socialsKeys.includes(key)) {
          return {
            ...data,
            links: [...(data?.links || []), { name: key, url: value }]
          };
        }
        return { ...data, [key]: value };
      }, formData);

      Object.keys(payload).forEach(
        key => payload[key] === undefined && delete payload[key]
      );

      const { data } = await Api.artists.patch({ id, body: payload });
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
          key: 'about',
          label: 'About',
          Component: Textarea,
          validations: {
            required: {
              value: true
            }
          }
        }
      ]
    },
    {
      key: 'socials',
      title: 'Socials',
      fields: [
        {
          key: 'instagram',
          label: 'Instagram',
          Component: Input
        },
        {
          key: 'x',
          label: 'X',
          Component: Input
        },
        {
          key: 'facebook',
          label: 'Facebook',
          Component: Input
        },
        {
          key: 'spotify',
          label: 'Spotify',
          Component: Input
        },
        {
          key: 'apple_music',
          label: 'Apple Music',
          Component: Input
        },
        {
          key: 'youtube',
          label: 'Youtube',
          Component: Input
        },
        {
          key: 'soundcloud',
          label: 'Soundcloud',
          Component: Input
        }
      ]
    }
  ]
};
