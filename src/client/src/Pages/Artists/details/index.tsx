import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Modal, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { Artist } from '../helpers';
import Edit from './modals/Edit';
import Api from '../../../Api';

export default function ArtistDetails() {
  const { uid: userUID } = useContext(AuthContext);

  const { id = '0' } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [artist, setArtist] = useState<Artist>();

  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const fetchArtist = useCallback(async () => {
    try {
      const { data } = await Api.artists.get({
        id,
        config: { params: { serializer: 'detailed' } }
      });
      setArtist(data);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    (async () => await fetchArtist())();
  }, [fetchArtist]);

  return (
    <PageLayout
      title={artist?.name || ''}
      loading={loading}
      actions={[
        {
          icon: 'edit',
          perform: () => setOpenEdit(true),
          disabled: userUID !== artist?.created_by
        }
      ]}
      tabs={[
        {
          key: 'songs',
          label: 'Songs',
          to: `/artists/${artist?.uid}/songs`
        },
        {
          key: 'albums',
          label: 'Albums',
          to: `/artists/${artist?.uid}/albums`
        },
        {
          key: 'features',
          label: 'Features',
          to: `/artists/${artist?.uid}/features`
        }
      ]}
    >
      <section className="text-white">
        <div className="w-full flex justify-center items-center">
          <img
            src={artist?.image || ''}
            alt={artist?.name}
            className="h-72 w-72 shadow-lg shadow-neutral-400 dark:shadow-neutral-900 rounded-full"
          />
        </div>
      </section>

      <section>
        {openEdit && (
          <Modal onClose={() => setOpenEdit(false)}>
            <Edit
              onClose={() => setOpenEdit(false)}
              fetchArtist={fetchArtist}
            />
          </Modal>
        )}
      </section>
    </PageLayout>
  );
}
