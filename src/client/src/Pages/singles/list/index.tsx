import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../../Api';

import { Box, Card, PageLayout } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import { Single } from '../helpers';
import useActions from '../useActions';

export default function Singles() {
  const actions = useActions({ model: 'singles-list' });
  const [singles, setSingles] = useState<Single[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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

  const onClick = useCallback(
    (uid: string) => navigate(`/singles/${uid}`),
    [navigate]
  );

  return (
    <PageLayout title="Singles" loading={loading} actions={actions}>
      <Box display="flex" margin="0 5%" flexWrap="wrap">
        {singles.map(single => (
          <Card
            key={single.uid}
            title={single.name}
            image={single.image}
            onClick={() => onClick(single.uid)}
          />
        ))}
      </Box>
    </PageLayout>
  );
}
