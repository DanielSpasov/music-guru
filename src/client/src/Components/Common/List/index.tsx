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

  if (loading) return <Skeleton model={model} length={skeletonLength} />;
  return (
    <>
      {data.map(x => (
        <Card data={x} key={x?.uid} model={model} onClick={() => onClick(x)} />
      ))}
    </>
  );
}
