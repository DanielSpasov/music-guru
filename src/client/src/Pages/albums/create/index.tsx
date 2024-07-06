import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback } from 'react';
import moment from 'moment';

import {
  Fieldset,
  File,
  Form,
  Input,
  PageLayout,
  Select,
  Mask
} from '../../../Components';
import { BaseAlbumSchema } from '../../../Validations/Album';
import { ListSong } from '../../../Types/Song';
import Api from '../../../Api';

export default function CreateAlbum() {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (formData: any) => {
      try {
        const payload = {
          ...formData,
          release_date: formData?.release_date
            ? moment(formData?.release_date, 'MM/DD/YYYY').toDate()
            : null,
          type: formData?.type,
          artist: formData?.artist?.uid,
          songs: formData?.songs?.map((x: ListSong) => x?.uid)
        };
        const res = await Api.albums.post({
          body: payload,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
        toast.success('Successfully Created Album');
        navigate(`/albums/${res.uid}`);
      } catch (err) {
        toast.error('Failed to Create Album');
      }
    },
    [navigate]
  );

  return (
    <PageLayout title="Create Album" hideHeader>
      <Form
        onSubmit={onSubmit}
        className="m-auto"
        header="New Album"
        validationSchema={BaseAlbumSchema}
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

          <Fieldset>
            <Fieldset className="flex gap-2">
              <Mask
                label="Release Date"
                name="release_date"
                mask="99/99/9999"
              />
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

            <Select
              label="Songs"
              name="songs"
              multiple
              fetchFn={({ config }) => Api.songs.fetch({ config })}
            />
          </Fieldset>
        </Fieldset>
      </Form>
    </PageLayout>
  );
}
