import { useNavigate, useParams } from 'react-router-dom';
import { FC, useCallback } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';

import {
  Fieldset,
  Form,
  Input,
  Mask,
  PageLayout,
  Select
} from '../../../Components';
import { EditAlbumData, EditAlbumSchema } from '../../../Validations';
import { SubmitFn } from '../../../Components/Forms/Form/types';
import { EditAlbumProps } from './types';
import Api from '../../../Api';

const EditAlbum: FC<EditAlbumProps> = ({ data }) => {
  const navigate = useNavigate();
  const { id = '0' } = useParams();

  const onSubmit: SubmitFn<EditAlbumData> = useCallback(
    async formData => {
      try {
        const payload = {
          ...formData,
          release_date: formData?.release_date
            ? moment(formData.release_date).toDate()
            : null,
          type: formData.type.uid,
          artist: formData.artist.uid,
          songs: formData.songs?.map(x => x.uid)
        };
        await Api.albums.patch({
          id,
          body: payload
        });
        toast.success('Successfully Edited Album');
        navigate(`/albums/${id}`);
      } catch (err) {
        toast.error('Failed to Edit Album');
      }
    },
    [navigate, id]
  );

  return (
    <PageLayout title="Edit Album" hideHeader hideFooter>
      <Form
        onSubmit={onSubmit}
        header="Edit Album"
        className="m-auto"
        validationSchema={EditAlbumSchema}
        defaultValues={{
          ...data,
          release_date: data?.release_date
            ? moment(data?.release_date).format('MM/DD/yyyy')
            : ''
        }}
      >
        <Fieldset title="Details" foldable>
          <Fieldset className="flex gap-2">
            <Input label="Name" name="name" required />
            <Select
              label="Type"
              name="type"
              required
              hideSearch
              fetchFn={({ config }) => Api.albums.fetchTypes({ config })}
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
                label="Artist"
                name="artist"
                required
                fetchFn={({ config }) => Api.artists.fetch({ config })}
              />
            </Fieldset>

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
};

export default EditAlbum;