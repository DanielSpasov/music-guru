import { useCallback } from 'react';

import { Form, PageLayout } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import { schema } from './schema';

export default function CreateArtist() {
  const onSubmit = useCallback((data: any) => {
    try {
      console.log(data);
    } catch (error) {
      errorHandler(error);
    }
  }, []);

  return (
    <PageLayout title="Create Artist" showHeader={false}>
      <Form header="Create Artist" onSubmit={onSubmit} schema={schema} />
    </PageLayout>
  );
}
