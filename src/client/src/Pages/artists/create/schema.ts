import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { CreateArtistSchema, ArtistSocialsSchema } from '../../../Validations';
import { Input, Textarea } from '../../../Components';
import Api from '../../../Api';

export const schema: FormSchema = {
  title: 'Create Artist',
  header: 'Create Artist',
  validationSchema: CreateArtistSchema,
  onSubmit: async ({ formData, toast, navigate }) => {
    try {
      const socialsKeys = Object.keys(ArtistSocialsSchema.shape);

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

      const res = await Api.artists.post({
        body: payload,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      });
      toast.success('Successfully Created Artist');
      navigate(`/artists/${res.uid}`);
    } catch (err) {
      toast.error('Failed to Create Artist');
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
