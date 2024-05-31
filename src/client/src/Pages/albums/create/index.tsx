import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback } from 'react';
import moment from 'moment';

import { Fieldset, File, Form, Input, PageLayout } from '../../../Components';
import { CreateAlbumSchema } from '../../../Validations/Album';
import MaskField from '../../../Components/Forms/Fields/Date';
import { Song } from '../../../Types/Song';
import Api from '../../../Api';

export default function CreateAlbum() {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (formData: any) => {
      try {
        const payload = {
          ...formData,
          release_date: moment(formData?.release_date, 'MM/DD/YYYY').toDate(),
          type: formData?.type?.[0],
          artist: formData?.artist?.[0]?.uid,
          songs: formData?.songs?.map((x: Song) => x?.uid)
        };
        console.log(payload);
        // const res = await Api.albums.post({
        //   body: payload,
        //   config: { headers: { 'Content-Type': 'multipart/form-data' } }
        // });
        // toast.success('Successfully Created Album');
        // navigate(`/albums/${res.uid}`);
      } catch (err) {
        toast.error('Failed to Create Album');
      }
    },
    [navigate]
  );

  return (
    <PageLayout title="Create Album" showHeader={false}>
      <Form
        onSubmit={onSubmit}
        className="m-auto"
        header="New Album"
        validationSchema={CreateAlbumSchema}
      >
        <Fieldset title="Details" foldable>
          <Input label="Name" name="name" required={true} />
          <File label="Image" name="image" required={true} />
          <MaskField
            label="Release Date"
            name="release_date"
            mask="99/99/9999"
          />
        </Fieldset>
      </Form>
    </PageLayout>
  );
}
