import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import { ListProps, Model } from './helpers';
import Skeleton from './skeleton';
import Card from '../Card';

export default function List({ data, model, loading = false }: ListProps) {
  const navigate = useNavigate();

  const onClick = useCallback(
    (option: Model) => navigate(`/${model}/${option.uid}`),
    [model, navigate]
  );

  if (loading) return <Skeleton />;
  return (
    <>
      {data.map(x => (
        <Card
          key={x.uid}
          title={x.name}
          image={x.image}
          onClick={() => onClick(x)}
        />
      ))}
    </>
  );
}
