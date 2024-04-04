import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ListProps, Model } from './helpers';
import Filters from './Filters';
import { Card } from '../../';

export default function List({
  model,
  fetchFn,
  filtersConfig = [],
  skeletonLength = 18,
  center = true
}: ListProps) {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await fetchFn({ params: filters });
      setData(data);
    } catch (err) {
      toast.error(`Failed to fetch ${model}.`);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, model, filters]);

  useEffect(() => {
    (async () => await fetchList())();
    // This is supposed to be run only once
    // eslint-disable-next-line
  }, []);

  const onClick = useCallback(
    (option: Model) => navigate(`/${model}/${option?.uid}/`),
    [model, navigate]
  );

  return (
    <section className="flex flex-col items-center">
      <Filters
        config={filtersConfig}
        setFilters={setFilters}
        onSubmit={fetchList}
      />

      <div
        className={`flex flex-wrap w-full ${
          center ? 'items-center justify-center' : 'items-start justify-start'
        }`}
      >
        {loading ? (
          Array(skeletonLength)
            .fill(null)
            .map((_, i) => (
              <Card key={i} data={data} model={model} loading={true} />
            ))
        ) : !data.length ? (
          <h4 className="font-medium">No {model} available.</h4>
        ) : (
          data.map(x => (
            <Card
              data={x}
              key={x?.uid}
              model={model}
              onClick={() => onClick(x)}
              loading={loading}
            />
          ))
        )}
      </div>
    </section>
  );
}
