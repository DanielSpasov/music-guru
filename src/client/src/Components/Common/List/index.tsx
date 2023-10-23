import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import { ListProps, Model } from './helpers';
import Skeleton from './skeleton';
import Card from '../Card';

export default function List({
  data,
  model,
  loading = false,
  skeletonLength = 15
}: ListProps) {
  const navigate = useNavigate();

  const onClick = useCallback(
    (option: Model) => navigate(`/${model}/${option?.uid}`),
    [model, navigate]
  );

  if (loading) {
    return (
      <section className="flex flex-wrap mx-10">
        <Skeleton model={model} length={skeletonLength} />
      </section>
    );
  }

  if (!data.length) {
    return <h4 className="text-center">No {model} available.</h4>;
  }

  return (
    <section className="flex flex-wrap mx-10">
      {data.map(x => (
        <Card data={x} key={x?.uid} model={model} onClick={() => onClick(x)} />
      ))}
    </section>
  );
}
