import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { DatePicker, Input, Select } from '../../../Components';
import { Song } from '../../songs/helpers';
import { AlbumSchema } from '../helpers';
import Api from '../../../Api';

export const schema: FormSchema = {
  title: 'Create Album',
  header: 'Create Album',
  validationSchema: AlbumSchema,
  fetchDefaultData: async ({ toast }) => {
    try {
      const { data } = await Api.albums.fetchTypes({
        config: { params: { code: 'A' } }
      });
      return { type: data };
    } catch (err) {
      toast.error('Failed to fetch default data.');
      return {};
    }
  },
  onSubmit: async ({ formData, toast, navigate }) => {
    try {
      const payload = {
        ...formData,
        type: formData?.type?.[0],
        artist: formData?.artist?.[0]?.uid,
        songs: formData?.songs?.map((x: Song) => x?.uid)
      };
      const res = await Api.albums.post({
        body: payload,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      });
      toast.success(`Successfully created album: ${res.name}`);
      navigate(`/albums/${res.uid}`);
    } catch (err) {
      toast.error('Failed to Create Album.');
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
            fetchFn: ({ params }) => Api.artists.fetch({ config: { params } })
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
            fetchFn: ({ params }) => Api.songs.fetch({ config: { params } }),
            multiple: true
          }
        }
      ]
    }
  ]
};
