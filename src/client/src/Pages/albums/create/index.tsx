import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, PageLayout } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import { Song } from '../../songs/helpers';
import { AlbumSchema } from '../helpers';
import { schema } from './schema';
import Api from '../../../Api';

export default function CreateAlbum() {
  const [defaultValues, setDefaultValues] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data: type } = await Api.albums.fetchTypes({
          config: { params: { code: 'A' } }
        });
        setDefaultValues({ type });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSubmit = useCallback(
    async (body: any) => {
      try {
        const payload = {
          ...body,
          type: body?.type?.[0],
          artist: body?.artist?.[0]?.uid,
          songs: body?.songs?.map((x: Partial<Song>) => x?.uid)
        };
        const res = await Api.albums.post({
          body: payload,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
        toast.success(`Successfully created album: ${res.name}`);
        navigate(`/albums/${res.uid}`);
      } catch (error) {
        const errors = errorHandler(error);
        toast.error(errors?.[0]?.message);
      }
    },
    [navigate]
  );

  return (
    <PageLayout title="Create Album" showHeader={false} loading={loading}>
      <Form
        validationSchema={AlbumSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        showClose={false}
        schema={schema}
      />
    </PageLayout>
  );
}
