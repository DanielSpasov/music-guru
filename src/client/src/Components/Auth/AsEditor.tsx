import { ComponentType, FC, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { BaseDetailedModel } from '../../Types';
import { AuthContext } from '../../Contexts';
import { Model } from '../../Api/types';
import Loader from '../Core/Loader';
import Api from '../../Api';

const AsEditor = <T extends object>(Component: ComponentType<T>) => {
  const WrappedComponent: FC<T> = props => {
    const { uid, isAuthenticated } = useContext(AuthContext);

    const { id = '0' } = useParams();
    const location = useLocation();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<BaseDetailedModel>();

    useEffect(() => {
      (async () => {
        try {
          setLoading(true);

          const model = location.pathname.split('/')[1] as Exclude<
            Model,
            'users'
          >;

          if (!Api?.[model]) return;

          const { data } = await Api[model].get({
            id,
            config: { params: { serializer: 'detailed' } }
          });
          setData(data);
        } catch (err) {
          toast.error('Failed to determine ownership.');
        } finally {
          setLoading(false);
        }
      })();
    }, [location, id]);

    if (!isAuthenticated) {
      return <Navigate to="/sign-in" replace />;
    }

    if (loading) {
      return (
        <div className="flex h-screen">
          <Loader size="lg" type="vinyl" />
        </div>
      );
    }

    if (data?.created_by === uid) {
      return <Component {...props} data={data} />;
    }

    if (data?.editors?.find(user => user.uid === uid)) {
      return <Component {...props} data={data} />;
    }

    return <Navigate to="/access-denied" replace />;
  };

  return WrappedComponent;
};

export default AsEditor;
