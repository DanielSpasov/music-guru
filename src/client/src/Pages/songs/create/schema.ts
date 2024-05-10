import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { Calendar, Input, Select } from '../../../Components';
import { CreateSongSchema } from '../../../Validations/Song';
import { SocialsSchema } from '../../../Validations';
import { Artist } from '../../../Types/Artist';
import Api from '../../../Api';

export const schema: FormSchema = {
  title: 'Create Song',
  header: 'Create Song',
  validationSchema: CreateSongSchema,
  onSubmit: async ({ toast, formData, navigate }) => {
    try {
      const socialsKeys = Object.keys(SocialsSchema.shape);

      const socialsPayload = Object.entries(formData).reduce(
        (data, [key, value]) => {
          if (!value) return data;

          if (socialsKeys.includes(key)) {
            return {
              ...data,
              links: [...(data?.links || []), { name: key, url: value }]
            };
          }
          return { ...data, [key]: value };
        },
        formData
      );

      Object.keys(socialsPayload).forEach(
        key => socialsPayload[key] === undefined && delete socialsPayload[key]
      );

      const payload = {
        ...socialsPayload,
        artist: formData.artist?.[0]?.uid,
        features: formData?.features?.map((x: Artist) => x.uid)
      };

      const res = await Api.songs.post({
        body: payload,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      });
      toast.success('Successfully Created Song');
      navigate(`/songs/${res.uid}`);
    } catch (err) {
      toast.error('Failed to Create Song');
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
          key: 'image',
          label: 'Image',
          Component: Input,
          props: {
            type: 'file',
            accept: ['image/jpeg', 'image/png']
          }
        },
        {
          key: 'release_date',
          label: 'Release Date',
          Component: Calendar
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
            required: {
              value: true,
              message: 'Artist is required.'
            }
          }
        },
        {
          key: 'features',
          label: 'Featured Artists',
          Component: Select,
          props: {
            fetchFn: ({ params }: any) =>
              Api.artists.fetch({ config: { params } }),
            multiple: true
          }
        }
      ]
    },
    {
      key: 'socials',
      title: 'Socials',
      fields: [
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
