import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import { ListProps, Model } from './helpers';
import { Icon, Card } from '../../';

export default function List({
  data,
  model,
  title,
  filters = [],
  loading = false,
  skeletonLength = 18
}: ListProps) {
  const navigate = useNavigate();

  const onClick = useCallback(
    (option: Model) => navigate(`/${model}/${option?.uid}`),
    [model, navigate]
  );

  return (
    <section className="mx-10">
      {title && <h1 className="text-center p-2 my-4">{title}</h1>}

      {!!filters.length && (
        <div className="p-2 my-4 flex">
          <Icon model="filter" />
        </div>
      )}

      <div className={`flex flex-wrap ${!data.length && 'justify-start'}`}>
        {loading ? (
          Array(skeletonLength)
            .fill(null)
            .map((_, i) => (
              <Card key={i} data={data} model={model} loading={true} />
            ))
        ) : !data.length ? (
          <h4>No {model} available.</h4>
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
