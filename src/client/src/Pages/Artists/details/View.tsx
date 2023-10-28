import { useEffect, useState } from 'react';

import { List } from '../../../Components';
import { ViewProps } from './helpers';

export default function View({ fetchFn, model, label, id }: ViewProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (!fetchFn) return;
        setLoading(true);
        const { data } = await fetchFn(id);
        setData(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, fetchFn]);

  return (
    <>
      <h2 className="text-center">{label}</h2>
      <List data={data} model={model} loading={loading} />
    </>
  );
}
