import { PageLayout } from '../../Components';
import useActions from './useActions';

export default function Artists() {
  const actions = useActions();

  return <PageLayout title="Artists" actions={actions}></PageLayout>;
}
