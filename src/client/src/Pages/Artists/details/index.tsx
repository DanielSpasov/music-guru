import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { Modal, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { Artist } from '../helpers';
import Edit from './modals/Edit';
import Api from '../../../Api';
import View from './View';
import { viewConfig } from './helpers';

export default function ArtistDetails() {
  const { uid: userUID } = useContext(AuthContext);

  const [query] = useSearchParams();
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
  }, [fetchArtist, id]);

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
          key: 'details',
          label: 'Details',
          to: `/artists/${artist?.uid}`
        },
        {
          key: 'songs',
          label: 'Songs',
          to: `/artists/${artist?.uid}?view=songs`
        },
        {
          key: 'albums',
          label: 'Albums',
          to: `/artists/${artist?.uid}?view=albums`
        },
        {
          key: 'features',
          label: 'Features',
          to: `/artists/${artist?.uid}?view=features`
        }
      ]}
    >
      <section className="flex justify-evenly">
        <div className="flex-1 flex justify-center">
          <img
            src={artist?.image || ''}
            alt={artist?.name}
            className="h-72 w-72 shadow-lg shadow-neutral-400 dark:shadow-neutral-900 rounded-full"
          />
        </div>

        <div className="flex-1">
          <View {...(viewConfig[query.get('view') as string] ?? {})} id={id} />
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
