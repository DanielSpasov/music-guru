import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback } from 'react';
import moment from 'moment';

import { SubmitFn } from '../../../Components/Forms/Form/types';
import Api from '../../../Api';
import {
  Fieldset,
  File,
  Form,
  Input,
  PageLayout,
  Select,
  Mask,
  Textarea
} from '../../../Components';
import {
  CreateAlbumSchema,
  CreateAlbumData,
  SocialsSchema
} from '../../../Validations';

const CreateAlbum = () => {
  const navigate = useNavigate();

  const onSubmit: SubmitFn<CreateAlbumData> = useCallback(
    async formData => {
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
          ...formData,
          ...socialsPayload,
          release_date: formData?.release_date
            ? moment(formData?.release_date, 'MM/DD/YYYY').toDate()
            : null,
          type: formData?.type?.uid,
          artist: formData?.artist?.uid
        };

        const { data } = await Api.albums.post({
          body: payload,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
        toast.success('Successfully Created Album');
        navigate(`/albums/${data.uid}`);
      } catch (err) {
        toast.error('Failed to Create Album');
      }
    },
    [navigate]
  );

  return (
    <PageLayout title="Create Album" hideHeader hideFooter>
      <Form
        onSubmit={onSubmit}
        className="m-auto"
        header="New Album"
        validationSchema={CreateAlbumSchema}
      >
        <Fieldset title="Details" foldable>
          <Fieldset className="flex gap-2">
            <Input label="Name" name="name" required />
            <File
              label="Image"
              name="image"
              accept="image/jpeg, image/png"
              required
            />
          </Fieldset>

          <Textarea label="About" name="about" />

          <Fieldset className="flex gap-2">
            <Mask label="Release Date" name="release_date" mask="99/99/9999" />
            <Select
              label="Type"
              name="type"
              required
              hideSearch
              fetchFn={({ config }) => Api.albums.fetchTypes({ config })}
            />
          </Fieldset>

          <Select
            label="Artist"
            name="artist"
            required
            fetchFn={({ config }) => Api.artists.fetch({ config })}
          />
        </Fieldset>

        <Fieldset title="Links" foldable>
          <Input name="spotify" label="Spotify" />
          <Input name="apple_music" label="Apple Music" />
          <Input name="youtube" label="Youtube" />
          <Input name="soundcloud" label="Soundcloud" />
        </Fieldset>
      </Form>
    </PageLayout>
  );
};

export default CreateAlbum;
