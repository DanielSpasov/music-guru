import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { List, Modal, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { viewConfig } from './helpers';
import { Artist } from '../helpers';
import Edit from './modals/Edit';
import Api from '../../../Api';

export default function ArtistDetails() {
  const { uid: userUID } = useContext(AuthContext);

  const [query] = useSearchParams();
  const { id = '0' } = useParams();

  const [artist, setArtist] = useState<Artist>();
  const [loading, setLoading] = useState(true);

  const [openEdit, setOpenEdit] = useState(false);

  const view = useMemo(
    () => viewConfig[query.get('view') as string] ?? {},
    [query]
  );

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
          onClick: () => setOpenEdit(true),
          disabled: userUID !== artist?.created_by
        }
      ]}
      tabs={[
        {
          key: 'details',
          label: 'Details',
          to: `/artists/${id}`
        },
        {
          key: 'albums',
          label: 'Albums',
          to: `/artists/${id}?view=albums`
        },
        {
          key: 'songs',
          label: 'Songs',
          to: `/artists/${id}?view=songs`
        },
        {
          key: 'features',
          label: 'Features',
          to: `/artists/${id}?view=features`
        }
      ]}
    >
      <section className="flex justify-evenly">
        <div className="w-1/3 flex justify-center">
          <img
            src={artist?.image || ''}
            alt={artist?.name}
            className="h-72 w-72 shadow-lg shadow-neutral-400 dark:shadow-neutral-900 rounded-full"
            loading="lazy"
          />
        </div>

        <div className="w-2/3">
          {viewConfig[query.get('view') as string] && artist ? (
            <>
              <h2 className="text-center">{view.label}</h2>
              <List fetchFn={view.fetchFn(artist.uid)} model={view.model} />
            </>
          ) : (
            <>
              <h2>Biography</h2>
              <span className="">{artist?.bio}</span>
            </>
          )}
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
