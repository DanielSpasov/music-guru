import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { List, PageLayout } from '../../../Components';
import { AuthContext } from '../../../Contexts/Auth';
import { errorHandler } from '../../../Handlers';
import { View, views } from './views';
import { Artist } from '../helpers';
import Api from '../../../Api';
import Modals from './modals';

export default function ArtistDetails() {
  const { uid: userUID } = useContext(AuthContext);

  const { id = '0' } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [artist, setArtist] = useState<Artist>();

  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [loadingView, setLoadingView] = useState<boolean>();
  const [viewData, setViewData] = useState<any[]>([]);
  const [view, setView] = useState<View>();

  // Views
  useEffect(() => {
    (async () => {
      try {
        if (!view) return;
        setLoadingView(true);

        const params = view?.params
          ? { [view?.params.name]: artist?.[view?.params.key] }
          : {};
        const { data } = await Api[view.model].fetch({
          config: { params }
        });
        setViewData(data);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoadingView(false);
      }
    })();
  }, [view, artist]);

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
    >
      <section className="text-white">
        <div className="w-full flex justify-center items-center">
          <img
            src={artist?.image || ''}
            alt={artist?.name}
            className="h-72 w-72 border-neutral-800 border-8 rounded-full"
          />

          <div className="flex px-4">
            {views.map((view, i) => (
              <span
                key={i}
                onClick={() => setView(view)}
                className="px-1 text-lg hover:text dark:hover:text-primary-dark cursor-pointer"
              >
                {view.label}
              </span>
            ))}
          </div>
        </div>

        {view && (
          <List
            data={viewData}
            model={view.model}
            loading={loadingView}
            skeletonLength={2}
          />
        )}
      </section>

      <Modals
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        fetchArtist={fetchArtist}
      />
    </PageLayout>
  );
}
