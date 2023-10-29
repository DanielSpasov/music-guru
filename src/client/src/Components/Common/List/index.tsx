import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ListProps, Model } from './helpers';
import { Icon, Card } from '../../';

export default function List({
  model,
  fetchFn,
  filters = [],
  skeletonLength = 18
}: ListProps) {
  const [data, setData] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await fetchFn({});
        setData(data);
      } catch (err) {
        toast.error(`Failed to fetch ${model}.`);
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchFn, model]);

  const onClick = useCallback(
    (option: Model) => navigate(`/${model}/${option?.uid}`),
    [model, navigate]
  );

  return (
    <section className="mx-10">
      {!!filters.length && (
        <div className="p-2 my-4 flex">
          <Icon model="filter" />
        </div>
      )}

      <div
        className={`flex flex-wrap ${
          !data.length && !loading ? 'justify-center' : 'justify-start'
        }`}
      >
        {loading ? (
          Array(skeletonLength)
            .fill(null)
            .map((_, i) => (
              <Card key={i} data={data} model={model} loading={true} />
            ))
        ) : !data.length ? (
          <h4 className="text-center">No {model} available.</h4>
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
