import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Box, List, PageLayout } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import useActions from '../useActions';
import { Single } from '../helpers';
import Api from '../../../Api';

export default function Singles() {
  const actions = useActions({ model: 'singles-list' });
  const [loading, setLoading] = useState<boolean>(true);
  const [singles, setSingles] = useState<Single[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.singles.fetch({});
        setSingles(data);
      } catch (error) {
        errorHandler(error, navigate);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  return (
    <PageLayout title="Singles" actions={actions} loading={loading}>
      <Box display="flex" margin="0 5%" flexWrap="wrap">
        <List data={singles} model="singles" />
      </Box>
    </PageLayout>
  );
}
