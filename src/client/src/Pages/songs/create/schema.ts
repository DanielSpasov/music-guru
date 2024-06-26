import Api from '../../../Api';
import { Calendar, Input, Select } from '../../../Components';
import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { Artist } from '../../artists/helpers';
import { SongSchema } from '../helpers';

export const schema: FormSchema = {
  title: 'Create Song',
  header: 'Create Song',
  validationSchema: SongSchema,
  onSubmit: async ({ toast, formData, navigate }) => {
    try {
      const payload = {
        ...formData,
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
    }
  ]
};
