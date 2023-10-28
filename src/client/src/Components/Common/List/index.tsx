import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import { ListProps, Model } from './helpers';
import Card from '../Card';

export default function List({
  data,
  model,
  loading = false,
  skeletonLength = 18
}: ListProps) {
  const navigate = useNavigate();

  const onClick = useCallback(
    (option: Model) => navigate(`/${model}/${option?.uid}`),
    [model, navigate]
  );

  return (
    <section className="flex flex-wrap mx-10">
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
    </section>
  );
}
