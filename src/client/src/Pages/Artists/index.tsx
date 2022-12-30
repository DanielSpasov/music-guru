import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../Components';
import { getActions } from './helpers';

export default function Artists() {
  const navigate = useNavigate();

  return (
    <PageLayout title="Artists" actions={getActions({ navigate })}></PageLayout>
  );
}
